import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { useElectronStore } from '../../utils/hooks/useStore';

import './a.css';

const LoadingSpinner = () => <div className="spinner"></div>;

interface IAddFilesPageProps {}

const useAddFiles = () => {
  const [savePath] = useElectronStore<string>('SAVE_PATH', '');
  const [isLoading, setIsLoading] = useToggle(false);

  const onHandleDrop = async (files: File[]) => {
    setIsLoading(true);
    const result = await window.electron.ipcRenderer.invoke('addNewFiles', {
      sourceFiles: files.map((v) => ({
        path: v.path,
        fileName: v.name,
      })),
      storePath: savePath,
    });

    if (!result.success) alert('fail');

    setIsLoading(false);
  };

  return { isLoading, onHandleDrop };
};

const AddFilesPage = ({}: IAddFilesPageProps) => {
  const { isLoading, onHandleDrop } = useAddFiles();
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onHandleDrop,
  });

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default AddFilesPage;
