import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { queryKeys } from '../../../utils/queryKeys';
import { isNil } from 'lodash';
import { useFileInfo } from '../../SelectedFileViewer/hooks/query/useFileInfo';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

interface ISearchSimilarPageProps {}

const useCompareTargetID = () => {
  const { id } = useParams();
  if (Number.isInteger(Number(id))) return Number(id);
  return null;
};

const useGetSimilarThumbnails = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.getSimilarThumbnails(id),
    queryFn: async () => {
      if (isNil(id)) throw new Error('ID가 지정되지 않음');
      const result = await window.electron.ipcRenderer.invoke(
        'findSimilarThumbnails',
        { id },
      );
      return result.data;
    },
    enabled: isNil(id) === false,
  });

  return { data, isLoading };
};

const SearchSimilarPage = ({}: ISearchSimilarPageProps) => {
  const id = useCompareTargetID();
  const { data: fileData, isLoading: isFileDataLoading } = useFileInfo(id);
  const { isLoading: isSimilarLoading, data: similarData } =
    useGetSimilarThumbnails(id);

  return (
    <div className="flex flex-col p-6 gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        {isFileDataLoading ? '로딩중' : `"${fileData?.fileName}"`} 비슷한 썸네일
        파일 검색
      </h1>

      {isSimilarLoading ? (
        <div className="flex w-full items-center justify-center h-96">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-sky-100 h-12 w-12"></div>
        </div>
      ) : (
        <TileFileViewer
          data={
            similarData?.map((v) => ({
              thumbnails: [v.thumbnail],
              fileName: `(${(v.similarity * 100).toFixed(1)}) ${v.fileName}`,
              id: v.id,
            })) ?? []
          }
        />
      )}
    </div>
  );
};

export default SearchSimilarPage;
