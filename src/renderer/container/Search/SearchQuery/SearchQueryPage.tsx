import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { queryKeys } from '../../../utils/queryKeys';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

interface ISearchQueryPageProps {}

const useSearchFiles = (query: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.findFilesByQuery(query),
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke(
        'findFilesByQuery',
        {
          query,
        },
      );
      return result.data;
    },
    enabled: !!query,
  });

  return { data, isLoading };
};

const SearchQueryPage = ({}: ISearchQueryPageProps) => {
  const { query } = useParams();

  const { data, isLoading } = useSearchFiles(query);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        "{query}" 검색 결과
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
              fileName: v.fileName,
              id: v.id,
            })) ?? []
          }
        />
      )}
    </div>
  );
};

export default SearchQueryPage;
