import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { useElectronStore } from '../../utils/hooks/useStore';
import DragDropUploader from './components/DragDropUploader/DragDropUploader';
import FileViewer from './components/FileViewer/FileViewer';
import { useFileList } from './hooks/query/useFileList';

interface IAddFilesPageProps {}

const MainPage = ({}: IAddFilesPageProps) => {
  const fileList = useFileList();
  console.log('fileList:', fileList);
  return (
    <DragDropUploader>
      <section className="p-6 w-full flex flex-col gap-3">
        <h1 className="font-bold text-2xl tracking-tight text-stone-800">
          추천 파일
        </h1>

        <div className="grid grid-cols-3 gap-4 w-full">
          {fileList.data?.map((v, index) => (
            <div
              className={`h-56 ${[1, 2].includes(index) ? 'col-span-2' : ''}`}
            >
              <FileViewer
                id={v.id}
                thumbnails={v.thumbnails}
                fileName={v.fileName}
                extension={v.extension}
              />
            </div>
          ))}
        </div>
      </section>
    </DragDropUploader>
  );
};

export default MainPage;
