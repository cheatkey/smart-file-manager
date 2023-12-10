import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../../utils/queryKeys';

export const useFileInfo = (id: number | null) => {
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

  return { data };
};
