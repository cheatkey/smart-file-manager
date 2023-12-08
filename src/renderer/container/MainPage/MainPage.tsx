import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useElectronStore } from '../../utils/hooks/useStore';
import DragDropUploader from './components/DragDropUploader';

interface IAddFilesPageProps {}

const MainPage = ({}: IAddFilesPageProps) => {
  return (
    <DragDropUploader>
      <div>hello</div>
    </DragDropUploader>
  );
};

export default MainPage;
