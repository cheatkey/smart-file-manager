import { z } from 'zod';
import fs from 'fs';

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
  addNewFiles: ipcFunction(
    z.object({
      sourceFiles: z.array(
        z.object({
          path: z.string(),
          fileName: z.string(),
        }),
      ),
      storePath: z.string(),
    }),
    async (input) => {
      const a = await Promise.all(
        input.sourceFiles.map(async ({ path, fileName }) => {
          const s = new Date();
          const extension = fileName.split('.').at(-1);

          const afterFileName = `${nanoid()}.${extension}`;

          await repository.createFile({
            storedName: afterFileName,
            fileName,
            tags: ['test'],
            memo: '메모장',
          });

          await fs.promises.copyFile(
            path,
            `${input.storePath}/${afterFileName}`,
          );
          await fs.promises.unlink(path);
          const e = new Date();
          console.log('실행시간', (e - s) / 1000);
        }),
      );
    },
  ),
};

export type IPC_CONTROLLER_TYPE = typeof ipcController;
