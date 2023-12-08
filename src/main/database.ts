import { PrismaClient } from '@prisma/client';
import pick from 'lodash/pick';

const prisma = new PrismaClient();

export const repository = {
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

  createFile: async (
    payload: FileModelDataType & {
      connect?: {
        thumbnails?: string[];
        group?: number;
        tags?: number[];
        history?: number;
      };
    },
  ) => {
    return prisma.file.create({
      data: {
        ...pick(payload, [
          'storedName',
          'createdAt',
          'fileName',
          'metadata',
          'memo',
        ]),
        thumbnails: {
          create: (payload.connect?.thumbnails ?? []).map((v) => ({
            imagePath: v,
          })),
        },
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
  'storedName' | 'createdAt' | 'fileName' | 'metadata' | 'memo'
>;

export const testDB = async () => {
  const tag1 = await repository.createTag('테스트 태그');
  const tag2 = await repository.createTag('테스트 태그2');

  const tags = await repository.getAllTagList();

  console.log(
    'tagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstagstags',
    await repository.createFile({
      createdAt: new Date(),
      memo: '메모',
      metadata: '{}',
      fileName: 'hello world',
      storedName: '저장',
      connect: {
        tags: [tag1.id, tag2.id],
      },
    }),
  );
};
