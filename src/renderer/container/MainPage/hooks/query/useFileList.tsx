import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../../utils/queryKeys';

export const useFileList = () => {
  const { isLoading, data } = useQuery({
    queryKey: queryKeys.getFileList,
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke(
        'getAllFiles',
        {},
      );

      return result.data;
    },
  });

  return {
    isLoading,
    data,
  };
};
