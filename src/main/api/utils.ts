import path from 'path';
import fs from 'fs';
import { ElectronStoreKeyType, electronStore } from '../main';
import { z } from 'zod';

const { nanoid } = require('nanoid');

export const ipcFunction = <T extends z.ZodObject<any>, S>(
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

export const getBase64Images = (thumbnails: string | null | undefined) => {
  const thumbnailPath = getStorePath().thumbnailPath;

  return (JSON.parse(thumbnails ?? '[]') as string[]).map((fileName) =>
    getBase64Image(`${thumbnailPath}/${fileName}`),
  );
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

export const moveFile = async (props: {
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

export const moveThumbnailImagePath = async (
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

export const intersection = (a: string[], b: string[]) =>
  a.filter((value) => b.includes(value));
