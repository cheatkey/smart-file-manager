import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { queryKeys } from '../../../utils/queryKeys';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

interface ISearchMetaDataFilesPageProps {}

const useMetaDataFiles = (key: string, value: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.getMetaDataFiles(key, value),
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke(
        'findMeataDataEqual',
        {
          key,
          value,
        },
      );
      return result.data;
    },
    enabled: !!key && !!value,
  });

  return { data, isLoading };
};

const SearchMetaDataFilesPage = ({}: ISearchMetaDataFilesPageProps) => {
  const { key, value } = useParams();
  const { data, isLoading } = useMetaDataFiles(key ?? '', value ?? '');

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        "{key}" 키의 값이 "{value}"인 파일 검색
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

export default SearchMetaDataFilesPage;

interface ISearchTagFilesPageProps {}
