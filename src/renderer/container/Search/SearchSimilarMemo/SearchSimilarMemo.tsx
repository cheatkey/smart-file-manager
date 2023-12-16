import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { queryKeys } from '../../../utils/queryKeys';
import isNil from 'lodash/isNil';
import { useFileInfo } from '../../SelectedFileViewer/hooks/query/useFileInfo';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

const useFileID = () => {
  const { id } = useParams();
  if (Number.isInteger(Number(id))) return Number(id);
  return null;
};

const useTagSimilarFiles = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.SearchSimilarMemo(id),
    queryFn: async () => {
      if (isNil(id)) return;
      const result = await window.electron.ipcRenderer.invoke(
        'findSimilarMemo',
        {
          id,
        },
      );
      return result.data;
    },
    enabled: isNil(id) === false,
  });

  return { data, isLoading };
};
interface ISearchSimilarMemoProps {}

const SearchSimilarMemo = ({}: ISearchSimilarMemoProps) => {
  const id = useFileID();
  const { data: fileData } = useFileInfo(id);
  const { data, isLoading } = useTagSimilarFiles(id);

  return (
    <div className="flex flex-col p-6 gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        "{fileData?.fileName}" 과 비슷한 메모를 가진 파일 목록
      </h1>

      {isLoading ? (
        <div className="flex w-full items-center justify-center h-96">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-sky-100 h-12 w-12"></div>
        </div>
      ) : (
        <TileFileViewer
          data={
            data?.map((v) => ({
              thumbnails: v.thumbnails,
              fileName: `(${(v.similarity * 100).toFixed(1)}%) ${v.fileName}`,
              id: v.id,
            })) ?? []
          }
        />
      )}
    </div>
  );
};

export default SearchSimilarMemo;
