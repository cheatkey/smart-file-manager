import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { useElectronStore } from '../../utils/hooks/useStore';
import DragDropUploader from './components/DragDropUploader/DragDropUploader';

interface IAddFilesPageProps {}

const MainPage = ({}: IAddFilesPageProps) => {
  useEffect(() => {
    const main = async () => {
      console.log(await window.electron.ipcRenderer.invoke('getAllFiles', {}));
    };
    main();
  }, []);

  return (
    <DragDropUploader>
      <button type="button" className="btn">
        Button
      </button>
    </DragDropUploader>
  );
};

export default MainPage;
