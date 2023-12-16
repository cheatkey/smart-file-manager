import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import isNil from 'lodash/isNil';
import { queryKeys } from '../../../../utils/queryKeys';
import toast from 'react-hot-toast';

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
    setTitle: async (fileName: string) => {
      await mutateAsync({
        id,
        payload: { fileName },
      });

      toast.success('메모 저장 완료');
    },
    setMemo: async (content: string) => {
      await mutateAsync({
        id,
        payload: {
          memo: content,
        },
      });

      toast.success('메모 저장 완료');
    },
    setRating: async (rating: number) => {
      const value = rating * 2;

      await mutateAsync({
        id,
        payload: {
          rating: value,
        },
      });

      toast.success('점수 저장 완료');
    },
    addThumbnail: async (
      acceptedFiles: { path: string; fileName: string }[],
    ) => {
      if (isNil(data)) return;

      await mutateAsync({
        id,
        payload: {
          thumbnails: {
            addPaths: acceptedFiles,
          },
        },
      });

      toast.success('썸네일 업데이트 완료');
    },
    deleteThumbnail: async (deletedThumbnailIndex: number) => {
      if (isNil(data)) return;

      await mutateAsync({
        id,
        payload: {
          thumbnails: {
            deleteIndex: deletedThumbnailIndex,
          },
        },
      });

      toast.success('썸네일 삭제 완료');
    },
    setTags: async (tagNames: string[]) => {
      await mutateAsync({
        id,
        payload: {
          tags: tagNames,
        },
      });

      toast.success('태그 저장 완료');
    },
    setMetadata: async (metadata: Record<string, string>) => {
      await mutateAsync({
        id,
        payload: { metadata },
      });

      toast.success('메타 데이터 저장 완료');
    },
    removeFile: async () => {
      if (isNil(id)) return;
      await window.electron.ipcRenderer.invoke('removeFile', {
        fileID: id,
      });
      toast.success('파일 삭제 완료');
    },
    addNewVersionFile: async (item: { path: string; fileName: string }) => {
      await mutateAsync({
        id,
        payload: {
          history: {
            add: item,
          },
        },
      });
    },
    deleteVersion: async (oldFileName: string) => {
      await mutateAsync({
        id,
        payload: {
          history: {
            delete: oldFileName,
          },
        },
      });
    },
  };

  return { data, isLoading, handler };
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
    history?: {
      add?: {
        path: string;
        fileName: string;
      };
      delete?: string;
    };
  };
}) => {
  if (isNil(props.id)) return;

  return await window.electron.ipcRenderer.invoke('updateFile', {
    id: props.id,
    payload: props.payload,
  });
};
