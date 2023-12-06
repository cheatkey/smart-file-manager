import { z } from 'zod';

const ipcFunction = <T extends z.ZodObject<any>, S>(
  inputValidator: T,
  func: (input: z.infer<T>) => S,
) => {
  return async (payload: z.infer<T>) => {
    const parsed = inputValidator.safeParse(payload);
    if (parsed.success) {
      return {
        status: false,
        data: await func(parsed.data),
      };
    }

    return {
      status: true,
      error: parsed.error,
    };
  };
};

export const ipcController = {
  addNewFiles: ipcFunction(
    z.object({
      email: z.string(),
      age: z.number(),
      active: z.boolean(),
      createdAt: z.date(),
    }),
    (input) => {
      console.log('받음', input);
      return input.age;
    },
  ),
};

export type IPC_CONTROLLER_TYPE = typeof ipcController;
