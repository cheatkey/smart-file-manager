import { z } from 'zod';
import fs from 'fs';
import { isNil, omit } from 'lodash';
import path from 'path';
import open from 'open';
import { repository } from './database';
import { ElectronStoreKeyType, electronStore } from './main';
import { findSimilarMemo, findSimilarThumbnails } from './search';

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

export const getBase64Image = (imgPath: string) => {
  const bitmap = fs.readFileSync(path.resolve(imgPath));
  const ext = path.extname(imgPath).substring(1);

  const mimeType = (() => {
    if (ext === 'png') return 'image/png';
    if (ext === 'gif') return 'image/gif';
    return 'image/jpeg';
  })();

  return `data:${mimeType};base64,${Buffer.from(bitmap).toString('base64')}`;
};

export const getStorePath = () => {
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

      await moveFile({
        originalPath: thumbnailFileItem.path,
        moveTargetPath: thumbnailPath,
        afterFileName: thumbnailAfterFileName,
      });

      thumbnailFileList.push(thumbnailAfterFileName);
    }
  }

  return thumbnailFileList;
};

const intersection = (a: string[], b: string[]) =>
  a.filter((value) => b.includes(value));

export const ipcController = {
  findSimilarMemo: ipcFunction(
    z.object({
      id: z.number(),
    }),
    async (input) => {
      const thumbnailPath = getStorePath().thumbnailPath;
      const result = await findSimilarMemo(input.id);

      return result.map((v) => ({
        ...v,
        thumbnails: (JSON.parse(v?.thumbnails ?? '[]') as string[]).map(
          (fileName) => getBase64Image(`${thumbnailPath}/${fileName}`),
        ),
      }));
    },
  ),
  findTagSimilar: ipcFunction(
    z.object({
      id: z.number(),
    }),
    async (input) => {
      const data = await repository.getFile(input.id);
      const targetTags = data?.tags.map((v) => v.tagName);
      if (isNil(targetTags) || targetTags.length === 0)
        throw new Error('대상 태그가 지정되지 않음');

      const allFile = await repository.getAllFiles.includeTags();

      const thumbnailPath = getStorePath().thumbnailPath;

      return allFile
        .reduce<
          {
            id: number;
            score: number;
            fileName: string;
            thumbnails: string[];
          }[]
        >((acc, cur) => {
          const tagIntersection = intersection(
            targetTags,
            cur.tags.map((v) => v.tagName),
          );
          const hasIntersection = tagIntersection.length > 0;
          if (!hasIntersection) return acc;

          const intersectionPercentage =
            (tagIntersection.length / targetTags.length) * 100;

          acc.push({
            id: cur.id,
            score: intersectionPercentage,
            fileName: cur.fileName,
            thumbnails: (JSON.parse(cur?.thumbnails ?? '[]') as string[]).map(
              (fileName) => getBase64Image(`${thumbnailPath}/${fileName}`),
            ),
          });
          return acc;
        }, [])
        .sort((a, b) => b.score - a.score);
    },
  ),
  findTagFiles: ipcFunction(
    z.object({
      tagName: z.string(),
    }),
    async (input) => {
      const thumbnailPath = getStorePath().thumbnailPath;
      const found = await repository.findTagFiles(input.tagName);

      return {
        ...found,
        files: found?.files.map((v) => ({
          ...omit(v, 'thumbnails'),
          thumbnails: (JSON.parse(v.thumbnails ?? '[]') as string[]).map(
            (fileName) => getBase64Image(`${thumbnailPath}/${fileName}`),
          ),
        })),
      };
    },
  ),

  findSimilarThumbnails: ipcFunction(
    z.object({
      id: z.number(),
    }),
    (input) => {
      return findSimilarThumbnails(input.id);
    },
  ),
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
          const added = await moveThumbnailImage(
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
  ),
  getTagList: ipcFunction(z.object({}), async (input) =>
    repository.getAllTagList(),
  ),
  getAllFiles: ipcFunction(z.object({}), async () => {
    const files = await repository.getAllFiles.includeActivity();

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
        ...omit(fileData, ['thumbnails', 'rating', 'history']),
        history: JSON.parse(fileData?.history ?? '[]') as string[],
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
          const { size: _fileSize } = await fs.promises.stat(item.path);
          const fileSize = Math.floor(_fileSize / 1024);
          const savePath = getStorePath().savePath;

          await moveFile({
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

const moveFile = async (props: {
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
