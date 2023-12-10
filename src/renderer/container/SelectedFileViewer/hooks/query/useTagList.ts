import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { queryKeys } from '../../../../utils/queryKeys';

export const useTagList = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: queryKeys.getAllTag,
    queryFn: async () => {
      const result = await window.electron.ipcRenderer.invoke('getTagList', {});

      return result.data;
    },
  });

  const { mutateAsync: addNewTag } = useMutation({
    mutationFn: (props: { tagName: string }) => {
      return window.electron.ipcRenderer.invoke('addTag', {
        tagName: props.tagName,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.getAllTag });
      toast.success('태그 추가 완료');
    },
  });

  return { data, addNewTag };
};
