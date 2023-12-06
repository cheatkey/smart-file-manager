import { FileA, Tag } from './main';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export class Repository {
  // eslint-disable-next-line no-useless-constructor, no-empty-function
  constructor() {}

  public async createFile(input: {
    storedName: string;
    fileName: string;
    metadata?: string;
    memo?: string;

    tags: string[];
  }) {
    const createdAt = new Date();

    const tagInstant = await Tag.create({
      tagName: '테스트',
    });

    // tagInstant.

    const createdFile = await FileA.create({
      storedName: input.storedName,
      createdAt,
      fileName: input.fileName,
      metadata: input.metadata ?? '{}',
      memo: input.memo ?? '',
    });
    await createdFile?.addTag(tagInstant);
    await createdFile?.addTags(tagInstant);
  }
}
