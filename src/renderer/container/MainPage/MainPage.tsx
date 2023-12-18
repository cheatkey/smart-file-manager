import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useToggle } from 'react-use';
import { useElectronStore } from '../../utils/hooks/useStore';
import DragDropUploader from './components/DragDropUploader/DragDropUploader';
import FileViewer from './components/FileViewer/FileViewer';
import { useFileList } from './hooks/query/useFileList';
import TileFileViewer from './components/FileListViewer/TileFileViewer';
import TableFileViewer from './components/FileListViewer/TableFileViewer/TableFileViewer';
import { FileViewerIcon } from '../../assets/Icon';
import { useRecommendFiles } from './hooks/query/useRecommendFiles';

interface IAddFilesPageProps {}

const MainPage = ({}: IAddFilesPageProps) => {
  const fileList = useFileList();
  const [isGridView, setIsGridView] = useToggle(true);
  const { recommendedFiles } = useRecommendFiles();

  return (
    <DragDropUploader>
      <section className="p-6 w-full flex flex-col gap-9">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-2xl tracking-tight text-stone-800">
            추천 파일
          </h1>

          <div className="grid grid-cols-3 gap-4 w-full">
            {recommendedFiles?.map((v, index) => (
              <div
                className={`h-56 ${
                  [1, 2, 5, 6, 9].includes(index) ? 'col-span-2' : ''
                }`}
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
          <div className="flex flex-row justify-between">
            <h1 className="font-bold text-2xl tracking-tight text-stone-800">
              모든 파일
            </h1>

            <div className="flex flex-row overflow-hidden items-center rounded-xl gap-1 bg-stone-50 px-2 py-1">
              <div
                className="cursor-pointer"
                onClick={() => {
                  setIsGridView(true);
                }}
              >
                <FileViewerIcon.Grid isSelected={isGridView === true} />
              </div>
              <div
                className="cursor-pointer pr-1"
                onClick={() => {
                  setIsGridView(false);
                }}
              >
                <FileViewerIcon.List isSelected={isGridView === false} />
              </div>
            </div>
          </div>

          {!!fileList.data && (
            <>
              {isGridView ? (
                <TileFileViewer data={fileList.data} />
              ) : (
                <TableFileViewer data={fileList.data} />
              )}
            </>
          )}
        </div>
      </section>
    </DragDropUploader>
  );
};

export default MainPage;
