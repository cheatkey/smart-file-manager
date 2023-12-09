import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { nanoid } from 'nanoid';
import { useElectronStore } from '../../../../utils/hooks/useStore';
import { useUploadStore } from '../../store/useUploadStore';
import UploadPage from './UploadPage';

// const useAddFiles = () => {
//   const [savePath, setSavePath] = useElectronStore<string>('SAVE_PATH', '');
//   const [thumbnailPath, setThumbnailPath] = useElectronStore<string>(
//     'THUMBNAIL_PATH',
//     '',
//   );
//   const [isLoading, setIsLoading] = useToggle(false);
//   useEffect(() => {
//     setSavePath('/media/cheat/새 볼륨/explorer/files');
//     setThumbnailPath('/media/cheat/새 볼륨/explorer/thumbnails');
//   }, []);

//   const onHandleDrop = async (files: File[]) => {
//     setIsLoading(true);
//     const result = await window.electron.ipcRenderer.invoke('addNewFiles', {
//       sourceFiles: files.map((v) => ({
//         path: v.path,
//         fileName: v.name,
//       })),
//       storePath: savePath,
//     });

//     if (!result.success) alert('fail');

//     setIsLoading(false);
//   };

//   return { isLoading, onHandleDrop };
// };

interface IDragDropUploaderProps {
  children: React.ReactNode;
}

const DragDropUploader = ({ children }: IDragDropUploaderProps) => {
  const files = useUploadStore((state) => state.files);
  const setFiles = useUploadStore((state) => state.setFiles);
  const { getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) =>
      setFiles(
        acceptedFiles.map((v) => ({
          path: v.path,
          name: v.name,
        })),
      ),
    noClick: true,
  });

  if (files.length > 0) {
    return <UploadPage />;
  }

  return (
    <div
      className="flex flex-row relative"
      {...getRootProps()}
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      {isDragActive && (
        <div
          className="backdrop-blur-sm absolute top-0 left-0 z-10 flex items-center justify-center"
          style={{
            minWidth: '100%',
            minHeight: '100vh',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-12 bounce"
          >
            <path
              d="M3 19H21V21H3V19ZM13 5.82843V17H11V5.82843L4.92893 11.8995L3.51472 10.4853L12 2L20.4853 10.4853L19.0711 11.8995L13 5.82843Z"
              fill="#006FEE"
            ></path>
          </svg>
        </div>
      )}

      <p>{JSON.stringify(isDragActive)}</p>
      {children}
    </div>
  );
};

export default DragDropUploader;
