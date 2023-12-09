import { z } from 'zod';
import fs from 'fs';
import { repository } from './database';
// eslint-disable-next-line import/no-cycle
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

export const ipcController = {
  getTagList: ipcFunction(z.object({}), async (input) =>
    repository.getAllTagList(),
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
              await moveAndDeleteFile({
                originalPath: thumbnailFileItem.path,
                moveTargetPath: thumbnailPath,
                afterFileName: `${fileName}.${thumbnailExt}`,
              });

              thumbnailFileList.push(fileName);
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
            connect: {
              thumbnails: thumbnailFileList,
            },
          });
        }),
      );
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
