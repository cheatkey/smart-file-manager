import { PrismaClient } from '@prisma/client';
import pick from 'lodash/pick';

const prisma = new PrismaClient();

export const repository = {
  addFileOpenActivity: async (fileID: number) => {
    const openActivity = await prisma.activity.create({
      data: {
        date: new Date(),
        content: 'open',
      },
    });

    return prisma.file.update({
      where: {
        id: fileID,
      },
      data: {
        activity: {
          connect: {
            id: openActivity.id,
          },
        },
      },
    });
  },

  getFile: async (fileID: number) =>
    prisma.file.findUnique({
      where: {
        id: fileID,
      },
      include: {
        group: true,
        history: true,
        activity: true,
      },
    }),

  getAllTagList: async () => {
    const tags = await prisma.tag.findMany();
    return [...new Set(tags.map((tag) => tag.tagName))];
  },

  createTag: (tagName: string) => {
    return prisma.tag.create({
      data: {
        tagName,
      },
    });
  },

  getAllFiles: () => prisma.file.findMany({}),

  createFile: async (
    payload: FileModelDataType & {
      connect: {
        thumbnails: string[];
        group?: number;
        tags?: number[];
        history?: number;
      };
    },
  ) => {
    const hasThumbnails = (payload.connect.thumbnails ?? []).length > 0;

    return prisma.file.create({
      data: {
        ...pick(payload, [
          'storedName',
          'createdAt',
          'fileName',
          'metadata',
          'memo',
          'extension',
          'fileSize',
          'rating',
        ]),
        thumbnails: hasThumbnails
          ? JSON.stringify(payload.connect.thumbnails)
          : '[]',
        group:
          payload.connect?.group !== undefined
            ? {
                connect: {
                  id: payload.connect.group,
                },
              }
            : {},
        tags:
          payload.connect?.tags !== undefined
            ? {
                connect: payload.connect.tags.map((tag) => ({ id: tag })),
              }
            : {},
        history:
          payload.connect?.history !== undefined
            ? {
                connect: { id: payload.connect.history },
              }
            : {},
      },
    });
  },
};

type FileModelDataType = Pick<
  Parameters<typeof prisma.file.create>[0]['data'],
  | 'storedName'
  | 'createdAt'
  | 'fileName'
  | 'metadata'
  | 'memo'
  | 'extension'
  | 'fileSize'
  | 'rating'
>;
