export const queryKeys = {
  getFileList: ['getFileList'],
  getFileInfo: (id: number | null) => ['fileInfo', id],
  getAllTag: ['getAllTag'],
  getSimilarThumbnails: (id: number | null) => ['getSimilarThumbnails', id],
  getTagFiles: (tagName: string) => ['getTagFiles', tagName],
  getSimilarTags: (id: number | null) => ['getSimilarTags', id],
  SearchSimilarMemo: (id: number | null) => ['SearchSimilarMemo', id],
};
