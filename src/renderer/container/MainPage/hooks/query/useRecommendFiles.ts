import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../../../utils/queryKeys';
import isNil from 'lodash/isNil';

export const useRecommendFiles = () => {
  const { data: recommendFileIDList } = useQuery({
    queryKey: queryKeys.getRecommendedFileIDList,
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke(
        'getRecommendedFiles',
        {},
      );

      return result.data;
    },
  });

  const { data: recommendedFiles } = useQuery({
    queryKey: queryKeys.getRecommendedFiles,
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke('getManyFile', {
        idList: (recommendFileIDList ?? []).map((v) => Number(v[0])),
      });

      return result.data;
    },
    enabled:
      isNil(recommendFileIDList) === false &&
      (recommendFileIDList ?? []).length > 0,
  });

  return {
    recommendedFiles,
  };
};
