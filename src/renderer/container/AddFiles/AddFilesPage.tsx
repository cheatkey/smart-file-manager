import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useElectronStore } from '../../utils/hooks/useStore';

interface IAddFilesPageProps {}

const AddFilesPage = ({}: IAddFilesPageProps) => {
  const [savePath, setSavePath] = useElectronStore<string>('SAVE_PATH', '');
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        console.log(file.path);
      });
    },
  });

  return (
    <div>
      <p>현재 저장 경로는 {savePath}입니다.</p>
      <input
        value={savePath}
        onChange={(event) => {
          setSavePath(event.target.value);
        }}
      ></input>

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
