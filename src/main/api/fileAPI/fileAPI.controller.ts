import { z } from 'zod';
import { repository } from '../../database';
import omit from 'lodash/omit';
import isNil from 'lodash/isNil';
import {
  getBase64Images,
  getStorePath,
  ipcFunction,
  moveFile,
  moveThumbnailImagePath,
} from '../utils';
import fs from 'fs';
import open from 'open';

const { nanoid } = require('nanoid');

export class FileService {
  public updateFile = ipcFunction(
    z.object({
      id: z.number(),
      payload: z.object({
        fileName: z.optional(z.string()),
        memo: z.optional(z.string()),
        metadata: z.optional(z.any()),
        rating: z.optional(z.number()),

        thumbnails: z.optional(
          z.object({
            addPaths: z.optional(
              z.array(
                z.object({
                  path: z.string(),
                  fileName: z.string(),
                }),
              ),
            ),
            deleteIndex: z.optional(z.number()),
          }),
        ),
        group: z.optional(z.number()),
        tags: z.optional(z.array(z.string())),
        history: z.optional(
          z.object({
            add: z.optional(
              z.object({
                path: z.string(),
                fileName: z.string(),
              }),
            ),
            delete: z.optional(z.string()),
          }),
        ),
      }),
    }),
    async (input) => {
      const prevFileData = await repository.getFile(input.id);

      const tags = await (async () => {
        if (isNil(input.payload.tags)) return undefined;

        const tagIDList = (await repository.getTagsID(input.payload.tags))
          .map((v) => v?.id)
          .filter((item) => isNil(item) === false) as number[];

        const hasTagIDList = prevFileData?.tags.map((v) => v.id) ?? [];

        return {
          connect: tagIDList.filter(
            (item) => hasTagIDList.includes(item) === false,
          ),
          disconnect: hasTagIDList.filter(
            (item) => tagIDList.includes(item) === false,
          ),
        };
      })();

      const thumbnails = await (async () => {
        if (isNil(input.payload.thumbnails)) return;

        let thumbnailFileNames = JSON.parse(
          prevFileData?.thumbnails ?? '[]',
        ) as string[];

        if (!isNil(input.payload.thumbnails.deleteIndex)) {
          thumbnailFileNames = thumbnailFileNames.filter(
            (v, index) => input.payload.thumbnails?.deleteIndex !== index,
          );
        }

        if (input.payload.thumbnails.addPaths) {
          const added = await moveThumbnailImagePath(
            input.payload.thumbnails.addPaths,
          );
          thumbnailFileNames = [...thumbnailFileNames, ...added];
        }

        return thumbnailFileNames;
      })();

      const history = await (async () => {
        if (input.payload.history?.add) {
          const extension =
            input.payload.history.add.fileName.split('.').at(-1) ?? '';
          const afterFileName = `${nanoid()}.${extension}`;
          const savePath = getStorePath().savePath;

          await moveFile({
            originalPath: input.payload.history.add.path,
            moveTargetPath: savePath,
            afterFileName,
          });

          return {
            addFile: afterFileName,
          };
        }

        if (input.payload.history?.delete) {
          return {
            delete: input.payload.history.delete,
          };
        }

        return undefined;
      })();

      return repository.updateFile(input.id, {
        fileName: input.payload.fileName,
        memo: input.payload.memo,
        metadata: JSON.stringify(input.payload.metadata),
        rating: input.payload.rating,

        connect: {
          thumbnails,
          group: input.payload.group,
          tags,
          history,
        },
      });
    },
  );

  public getAllFiles = ipcFunction(z.object({}), async () => {
    const files = await repository.getAllFiles.includeActivity();

    return files.map((v) => ({
      ...omit(v, 'thumbnails'),
      thumbnails: getBase64Images(v.thumbnails),
    }));
  });

  public getFileInfo = ipcFunction(
    z.object({
      fileID: z.number(),
    }),
    async (input) => {
      const fileData = await repository.getFile(input.fileID);

      return {
        ...omit(fileData, ['thumbnails', 'rating', 'history']),
        history: JSON.parse(fileData?.history ?? '[]') as string[],
        rating: (() => {
          if (isNil(fileData) || isNil(fileData?.rating))
            return fileData?.rating;
          return fileData.rating / 2;
        })(),
        thumbnails: getBase64Images(fileData?.thumbnails),
      };
    },
  );

  public addNewFiles = ipcFunction(
    z.object({
      files: z.array(
        z.object({
          path: z.string(),
          fileName: z.string(),
        }),
      ),
    }),

    async (input) => {
      return Promise.all(
        input.files.map(async (item) => {
          const extension = item.fileName.split('.').at(-1) ?? '';
          const afterFileName = `${nanoid()}.${extension}`;
          const { size: _fileSize } = await fs.promises.stat(item.path);
          const fileSize = Math.floor(_fileSize / 1024);
          const savePath = getStorePath().savePath;

          await moveFile({
            originalPath: item.path,
            moveTargetPath: savePath,
            afterFileName,
          });

          return repository.createFile({
            storedName: afterFileName,
            createdAt: new Date(),
            fileName: item.fileName,
            metadata: '{}',
            memo: '',
            extension,
            fileSize,
            rating: 5,
            connect: {
              thumbnails: [],
            },
          });
        }),
      );
    },
  );

  public openFile = ipcFunction(
    z.object({
      id: z.number(),
      historyFile: z.optional(z.string()),
    }),
    async (input) => {
      await repository.addFileOpenActivity(input.id);
      const file = await repository.getFile(input.id);
      if (!file) throw new Error();
      const savePath = getStorePath().savePath;

      if (input.historyFile) {
        if (
          (JSON.parse(file.history) as string[]).includes(input.historyFile) ===
          false
        ) {
          throw new Error('invalid version');
        }

        open(`${savePath}/${input.historyFile}`);
        return;
      }

      open(`${savePath}/${file.storedName}`);
    },
  );

  public removeFile = ipcFunction(
    z.object({
      fileID: z.number(),
    }),
    async (input) => {
      const file = await repository.getFile(input.fileID);
      if (!file) return;

      const { thumbnailPath, savePath } = getStorePath();

      await repository.removeFile(input.fileID);

      if (file.thumbnails) {
        await Promise.all(
          (JSON.parse(file.thumbnails) as string[]).map((fileName) =>
            fs.promises.unlink(`${thumbnailPath}/${fileName}`),
          ),
        );
      }

      await fs.promises.unlink(`${savePath}/${file.storedName}`);
    },
  );
}
