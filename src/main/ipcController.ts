import { z } from 'zod';
import fs from 'fs';
import { omit } from 'lodash';
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

export const ipcController = {
  getTagList: ipcFunction(z.object({}), async (input) =>
    repository.getAllTagList(),
  ),
  getAllFiles: ipcFunction(z.object({}), async () => {
    const files = await repository.getAllFiles();

    const thumbnailPath = electronStore.get(
      'THUMBNAIL_PATH' as ElectronStoreKeyType,
    ) as string;

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

      const thumbnailPath = electronStore.get(
        'THUMBNAIL_PATH' as ElectronStoreKeyType,
      ) as string;

      return {
        ...omit(fileData, 'thumbnails'),
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
          const savePath = electronStore.get(
            'SAVE_PATH' as ElectronStoreKeyType,
          ) as string;

          await moveAndDeleteFile({
            originalPath: item.path,
            moveTargetPath: savePath,
            afterFileName,
          });

          const thumbnailPath = electronStore.get(
            'THUMBNAIL_PATH' as ElectronStoreKeyType,
          ) as string;

          const thumbnailFileList: string[] = [];

          if (item.thumbnails.length > 0) {
            for await (const thumbnailFileItem of item.thumbnails) {
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

      const savePath = electronStore.get(
        'SAVE_PATH' as ElectronStoreKeyType,
      ) as string;

      if (!file) throw new Error();

      open(`${savePath}/${file.storedName}`);
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
