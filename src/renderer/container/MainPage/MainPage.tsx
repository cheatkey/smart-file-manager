import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { useElectronStore } from '../../utils/hooks/useStore';
import DragDropUploader from './components/DragDropUploader/DragDropUploader';
import FileViewer from './components/FileViewer/FileViewer';
import { useFileList } from './hooks/query/useFileList';
import TileFileViewer from './components/TileFileViewer/TileFileViewer';

interface IAddFilesPageProps {}

const MainPage = ({}: IAddFilesPageProps) => {
  const fileList = useFileList();
  console.log('fileList:', fileList);
  return (
    <DragDropUploader>
      <section className="p-6 w-full flex flex-col gap-9">
        <div className="flex flex-col gap-2">
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
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl tracking-tight text-stone-800">
            모든 파일
          </h1>

          <div className="grid grid-cols-4 gap-2">
            {fileList.data?.map((item) => (
              <TileFileViewer
                thumbnails={item.thumbnails}
                fileName={item.fileName}
                id={item.id}
              />
            ))}
          </div>
        </div>
      </section>
    </DragDropUploader>
  );
};

export default MainPage;
