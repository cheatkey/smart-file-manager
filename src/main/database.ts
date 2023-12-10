import { PrismaClient } from '@prisma/client';
import { isNil } from 'lodash';
import pick from 'lodash/pick';

const prisma = new PrismaClient();

export const repository = {
  getTagsID: async (tagNames: string[]) =>
    Promise.all(
      tagNames.map((tagName) =>
        prisma.tag.findFirst({
          where: {
            tagName,
          },
        }),
      ),
    ),

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

  updateFile: async (
    id: number,
    payload: Partial<
      Pick<FileModelDataType, 'fileName' | 'metadata' | 'memo' | 'rating'>
    > & {
      connect: {
        thumbnails?: string[];
        group?: number;
        tags?: number[];
        history?: number;
      };
    },
  ) => {
    type DataType = Parameters<typeof prisma.file.update>['0'];

    const queryData: DataType = {
      where: { id },
      data: {},
    };

    if (!isNil(payload.fileName)) queryData.data.fileName = payload.fileName;
    if (!isNil(payload.metadata)) queryData.data.metadata = payload.metadata;
    if (!isNil(payload.memo)) queryData.data.memo = payload.memo;
    if (!isNil(payload.rating)) queryData.data.rating = payload.rating;
    if (!isNil(payload.connect.thumbnails))
      queryData.data.thumbnails = JSON.stringify(payload.connect.thumbnails);

    if (!isNil(payload.connect.tags)) {
      queryData.data.tags = {
        connect: payload.connect.tags.map((v) => ({ id: v })),
      };
    }
    if (!isNil(payload.connect.history)) {
      queryData.data.history = {
        connect: { id: payload.connect.history },
      };
    }
    if (!isNil(payload.connect.group)) {
      queryData.data.group = {
        connect: { id: payload.connect.group },
      };
    }

    return prisma.file.update(queryData);
  },

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
