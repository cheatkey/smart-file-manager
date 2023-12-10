import { z } from 'zod';
import fs from 'fs';
import { isNil, omit } from 'lodash';
import path from 'path';
import open from 'open';
import { repository } from './database';
import { ElectronStoreKeyType, electronStore } from './main';

const { nanoid } = require('nanoid');

const ipcFunction = <T extends z.ZodObject<any>, S>(
  inputValidator: T,
  func: (input: z.infer<T>) => S,
) => {
  return async (payload: z.infer<T>) => {
    const parsed = inputValidator.safeParse(payload);
    if (parsed.success) {
      return {
        success: true,
        data: await func(parsed.data),
      };
    }

    return {
      success: false,
      error: parsed.error.errors,
    };
  };
};

const getBase64Image = (imgPath: string) => {
  const bitmap = fs.readFileSync(path.resolve(imgPath));
  const ext = path.extname(imgPath).substring(1);

  const mimeType = (() => {
    if (ext === 'png') return 'image/png';
    if (ext === 'gif') return 'image/gif';
    return 'image/jpeg';
  })();

  return `data:${mimeType};base64,${Buffer.from(bitmap).toString('base64')}`;
};

const getStorePath = () => {
  const thumbnailPath = electronStore.get(
    'THUMBNAIL_PATH' as ElectronStoreKeyType,
  ) as string;
  const savePath = electronStore.get(
    'SAVE_PATH' as ElectronStoreKeyType,
  ) as string;

  return { thumbnailPath, savePath };
};

const moveThumbnailImage = async (
  thumbnailsPath: { path: string; fileName: string }[],
) => {
  const thumbnailPath = getStorePath().thumbnailPath;

  const thumbnailFileList: string[] = [];

  if (thumbnailsPath.length > 0) {
    for await (const thumbnailFileItem of thumbnailsPath) {
      const fileName = nanoid();
      const thumbnailExt = thumbnailFileItem.fileName.split('.').at(-1);
      const thumbnailAfterFileName = `${fileName}.${thumbnailExt}`;

      await moveAndDeleteFile({
        originalPath: thumbnailFileItem.path,
        moveTargetPath: thumbnailPath,
        afterFileName: thumbnailAfterFileName,
      });

      thumbnailFileList.push(thumbnailAfterFileName);
    }
  }

  return thumbnailFileList;
};

export const ipcController = {
  addTag: ipcFunction(
    z.object({
      tagName: z.string(),
    }),
    async (input) => {
      return repository.createTag(input.tagName);
    },
  ),
  updateFile: ipcFunction(
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
        history: z.optional(z.number()),
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
          const added = await moveThumbnailImage(
            input.payload.thumbnails.addPaths,
          );
          thumbnailFileNames = [...thumbnailFileNames, ...added];
        }

        return thumbnailFileNames;
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
          history: input.payload.history,
        },
      });
    },
  ),
  getTagList: ipcFunction(z.object({}), async (input) =>
    repository.getAllTagList(),
  ),
  getAllFiles: ipcFunction(z.object({}), async () => {
    const files = await repository.getAllFiles();

    const thumbnailPath = getStorePath().thumbnailPath;

    return files.map((v) => ({
      ...omit(v, 'thumbnails'),
      thumbnails: (JSON.parse(v.thumbnails ?? '[]') as string[]).map(
        (fileName) => getBase64Image(`${thumbnailPath}/${fileName}`),
      ),
    }));
  }),
  getFileInfo: ipcFunction(
    z.object({
      fileID: z.number(),
    }),
    async (input) => {
      const fileData = await repository.getFile(input.fileID);

      const thumbnailPath = getStorePath().thumbnailPath;

      return {
        ...omit(fileData, ['thumbnails', 'rating']),
        rating: (() => {
          if (isNil(fileData) || isNil(fileData?.rating))
            return fileData?.rating;
          return fileData.rating / 2;
        })(),
        thumbnails: (JSON.parse(fileData?.thumbnails ?? '[]') as string[]).map(
          (fileName) => getBase64Image(`${thumbnailPath}/${fileName}`),
        ),
      };
    },
  ),
  addNewFiles: ipcFunction(
    z.object({
      files: z.array(
        z.object({
          path: z.string(),
          fileName: z.string(),
          thumbnails: z.array(
            z.object({
              path: z.string(),
              fileName: z.string(),
            }),
          ),
          tags: z.array(z.string()),
        }),
      ),
    }),

    async (input) => {
      return Promise.all(
        input.files.map(async (item) => {
          const extension = item.fileName.split('.').at(-1) ?? '';
          const afterFileName = `${nanoid()}.${extension}`;
          const { size: fileSize } = await fs.promises.stat(item.path);
          const savePath = getStorePath().savePath;

          await moveAndDeleteFile({
            originalPath: item.path,
            moveTargetPath: savePath,
            afterFileName,
          });

          const thumbnailFileList = await moveThumbnailImage(item.thumbnails);

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
              thumbnails: thumbnailFileList,
            },
          });
        }),
      );
    },
  ),
  openFile: ipcFunction(
    z.object({
      id: z.number(),
    }),
    async (input) => {
      await repository.addFileOpenActivity(input.id);
      const file = await repository.getFile(input.id);

      const savePath = getStorePath().savePath;

      if (!file) throw new Error();

      open(`${savePath}/${file.storedName}`);
    },
  ),
  removeFile: ipcFunction(
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
  ),
};

const moveAndDeleteFile = async (props: {
  originalPath: string;
  moveTargetPath: string;
  afterFileName: string;
}) => {
  await fs.promises.copyFile(
    props.originalPath,
    `${props.moveTargetPath}/${props.afterFileName}`,
  );
  await fs.promises.unlink(props.originalPath);
};

export type IPC_CONTROLLER_TYPE = typeof ipcController;
