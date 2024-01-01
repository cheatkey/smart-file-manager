export const queryKeys = {
  getFileList: ['getFileList'],
  getFileInfo: (id: number | null) => ['fileInfo', id],
  getAllTag: ['getAllTag'],
  getSimilarThumbnails: (id: number | null) => ['getSimilarThumbnails', id],
  getTagFiles: (tagName: string) => ['getTagFiles', tagName],
  getMetaDataFiles: (key: string, value: string) => [
    'getMetaDataFiles',
    key,
    value,
  ],
  getSimilarTags: (id: number | null) => ['getSimilarTags', id],
  SearchSimilarMemo: (id: number | null) => ['SearchSimilarMemo', id],
  findMetadataSimilar: (id: number | null) => ['findMetadataSimilar', id],
  getRecommendedFileIDList: ['getRecommendedFileIDList'],
  getRecommendedFiles: ['getRecommendedFiles'],
};
