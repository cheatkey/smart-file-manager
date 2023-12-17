import { SearchService } from './api/searchAPI/searcAPI.controller';
import { TagService } from './api/tagAPI/tagAPI.controller';
import { FileService } from './api/fileAPI/fileAPI.controller';

export const ipcController = {
  ...new SearchService(),
  ...new TagService(),
  ...new FileService(),
};

export type IPC_CONTROLLER_TYPE = typeof ipcController;
