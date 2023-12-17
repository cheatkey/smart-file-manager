import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { queryKeys } from '../../../../utils/queryKeys';
import { DragScreenIcon } from '../../../../assets/Icon';

interface IDragDropUploaderProps {
  children: React.ReactNode;
}

const DragDropUploader = ({ children }: IDragDropUploaderProps) => {
  const queryClient = useQueryClient();
  const { getRootProps, isDragActive } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const loadingMessage = (() => {
        if (acceptedFiles.length === 1) {
          return acceptedFiles[0].name;
        }

        return `${acceptedFiles[0].name} 외 ${acceptedFiles.length - 1}건`;
      })();

      const toastId = toast.loading(`${loadingMessage} 파일 저장 중`);

      const result = await window.electron.ipcRenderer.invoke('addNewFiles', {
        files: acceptedFiles.map((v) => ({
          path: v.path,
          fileName: v.name,
        })),
      });

      toast.dismiss(toastId);

      if (result.success) {
        queryClient.invalidateQueries({
          queryKey: queryKeys.getFileList,
        });
        toast.success('파일 추가 성공');
      } else {
        toast.error('파일 추가 실패');
      }
    },

    noClick: true,
  });

  return (
    <div
      className="flex flex-row relative min-h-screen w-full"
      {...getRootProps()}
    >
      {isDragActive && (
        <div className="fixed flex-col gap-1 bounce min-h-screen min-w-full backdrop-blur-sm top-0 left-0 z-50 flex items-center justify-center">
          <DragScreenIcon.FileUpload />

          <p className="font-bold text-stone-600 text-base">
            드래그&드롭으로 파일을 추가해주세요
          </p>
        </div>
      )}

      {children}
    </div>
  );
};

export default DragDropUploader;
