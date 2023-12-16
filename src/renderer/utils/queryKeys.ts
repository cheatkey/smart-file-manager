export const queryKeys = {
  getFileList: ['getFileList'],
  getFileInfo: (id: number | null) => ['fileInfo', id],
  getAllTag: ['getAllTag'],
  getSimilarThumbnails: (id: number | null) => ['getSimilarThumbnails', id],
};
