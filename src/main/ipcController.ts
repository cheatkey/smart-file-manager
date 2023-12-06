import { z } from 'zod';
import fs from 'fs';
import { getFileHash } from './utils';

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
          const startTime = new Date();

          const extension = fileName.split('.').at(-1);

          const afterFileName = `${await getFileHash(path)}.${extension}`;
          await fs.promises.copyFile(
            path,
            `${input.storePath}/${afterFileName}`,
          );
          await fs.promises.unlink(path);
          const endTime = new Date();

          const elapsedTime = (endTime - startTime) / 1000; // 밀리초를 초로 변환

          console.log(`myFunction took ${elapsedTime} seconds to execute`);
        }),
      );
    },
  ),
};

export type IPC_CONTROLLER_TYPE = typeof ipcController;
