import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { queryKeys } from '../../../utils/queryKeys';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

interface ISearchTagFilesPageProps {}

const useTagName = () => {
  const { tagName } = useParams();
  return tagName ?? '';
};

const useTagFiles = (tagName: string) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.getTagFiles(tagName),
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke('findTagFiles', {
        tagName,
      });
      return result.data;
    },
    enabled: !!tagName,
  });

  return { data, isLoading };
};

const SearchTagFilesPage = ({}: ISearchTagFilesPageProps) => {
  const tagName = useTagName();
  const { data, isLoading } = useTagFiles(tagName);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        "{tagName}" 태그를 가진 파일 목록
      </h1>

      {isLoading ? (
        <div className="flex w-full items-center justify-center h-96">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-sky-100 h-12 w-12"></div>
        </div>
      ) : (
        <TileFileViewer
          data={
            data?.files?.map((v) => ({
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

export default SearchTagFilesPage;
