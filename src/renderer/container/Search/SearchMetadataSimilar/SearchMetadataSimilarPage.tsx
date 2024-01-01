import { useQuery } from '@tanstack/react-query';
import isNil from 'lodash/isNil';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { queryKeys } from '../../../utils/queryKeys';
import { useFileInfo } from '../../SelectedFileViewer/hooks/query/useFileInfo';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

interface ISearchMetadataSimilarPageProps {}

const useFileID = () => {
  const { id } = useParams();
  if (Number.isInteger(Number(id))) return Number(id);
  return null;
};

const useMetadataSimilarFiles = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.findMetadataSimilar(id),
    queryFn: async () => {
      if (isNil(id)) return;
      const result = await window.electron.ipcRenderer.invoke(
        'findMetadataSimilar',
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

const SearchMetadataSimilarPage = ({}: ISearchMetadataSimilarPageProps) => {
  const fileID = useFileID();
  const { data: fileData, isLoading: isFileDataLoading } = useFileInfo(fileID);
  const { data, isLoading } = useMetadataSimilarFiles(fileID);

  return (
    <div className="flex flex-col gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        "{fileData?.fileName}" 파일과 유사한 메타데이터를 가진 파일
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
              fileName: `(${v.score.toFixed(1)}%) ${v.fileName}`,
              id: v.id,
            })) ?? []
          }
        />
      )}
    </div>
  );
};

export default SearchMetadataSimilarPage;
