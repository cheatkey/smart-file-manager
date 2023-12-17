import { z } from 'zod';
import { repository } from '../../database';
import { ipcFunction } from '../utils';

export class TagService {
  public addTag = ipcFunction(
    z.object({
      tagName: z.string(),
    }),
    async (input) => {
      return repository.createTag(input.tagName);
    },
  );

  public getTagList = ipcFunction(z.object({}), async (input) =>
    repository.getAllTagList(),
  );
}
