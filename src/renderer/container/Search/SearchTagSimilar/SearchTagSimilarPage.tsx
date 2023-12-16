import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFileInfo } from '../../SelectedFileViewer/hooks/query/useFileInfo';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../utils/queryKeys';
import { isNil } from 'lodash';
import TileFileViewer from '../../MainPage/components/FileListViewer/TileFileViewer';

const useFileID = () => {
  const { id } = useParams();
  if (Number.isInteger(Number(id))) return Number(id);
  return null;
};

const useTagSimilarFiles = (id: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.getSimilarTags(id),
    queryFn: async () => {
      if (isNil(id)) return;
      const result = await window.electron.ipcRenderer.invoke(
        'findTagSimilar',
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

interface ISearchTagSimilarPageProps {}

const SearchTagSimilarPage = ({}: ISearchTagSimilarPageProps) => {
  const fileID = useFileID();
  const navigate = useNavigate();
  const { data: fileData, isLoading: isFileDataLoading } = useFileInfo(fileID);
  const { data, isLoading } = useTagSimilarFiles(fileID);

  return (
    <div className="flex flex-col p-6 gap-2 w-full">
      <h1 className="font-bold text-2xl tracking-tight text-stone-800">
        "{fileData?.fileName}" 파일과 유사한 태그를 가진 파일
      </h1>

      <div className="flex flex-row gap-2 items-center">
        {fileData?.tags.map((v) => (
          <span
            className="bg-stone-200 text-stone-800 rounded-lg py-1 px-2 text-sm cursor-pointer transition-colors hover:bg-stone-300"
            key={v.id}
            onClick={() => {
              navigate(`/search-tag/${v.tagName}`);
            }}
          >
            {v.tagName}
          </span>
        ))}
      </div>

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

export default SearchTagSimilarPage;
