import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import isNil from 'lodash/isNil';
import { queryKeys } from '../../../../utils/queryKeys';

export const useFileInfo = (id: number | null) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: queryKeys.getFileInfo(id),
    queryFn: async () => {
      if (id === null) return;
      const result = await window.electron.ipcRenderer.invoke('getFileInfo', {
        fileID: id,
      });
      return result.data;
    },
    enabled: id !== null,
  });

  const { mutateAsync } = useMutation({
    mutationFn: mutationUploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getFileInfo(id) });
    },
  });

  const handler = {
    addThumbnail: async (
      acceptedFiles: { path: string; fileName: string }[],
    ) => {
      if (isNil(data)) return;

      return mutateAsync({
        id,
        payload: {
          thumbnails: {
            addPaths: acceptedFiles,
          },
        },
      });
    },
    deleteThumbnail: async (deletedThumbnailIndex: number) => {
      if (isNil(data)) return;

      return mutateAsync({
        id,
        payload: {
          thumbnails: {
            deleteIndex: deletedThumbnailIndex,
          },
        },
      });
    },
  };

  return { data, handler };
};

const mutationUploadFile = async (props: {
  id: number | null;
  payload: {
    fileName?: string | undefined;
    memo?: string | undefined;
    metadata?: any;
    rating?: number | undefined;
    thumbnails?: {
      addPaths?: { path: string; fileName: string }[];
      deleteIndex?: number | undefined;
    };
    group?: number | undefined;
    tags?: string[] | undefined;
    history?: number | undefined;
  };
}) => {
  if (isNil(props.id)) return;

  return await window.electron.ipcRenderer.invoke('updateFile', {
    id: props.id,
    payload: props.payload,
  });
};
