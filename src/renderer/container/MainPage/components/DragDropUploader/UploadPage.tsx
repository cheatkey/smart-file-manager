import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  useUploadStore,
  useUploadStoreSelector,
} from '../../hooks/store/useUploadStore';

interface IUploadPageProps {}

const UploadPage = ({}: IUploadPageProps) => {
  const {
    files,
    setIsSelected,
    addThumbnails,
    fetchTagList,
    tagList,
    addFiles,
  } = useUploadStoreSelector();
  const selectedFile = useUploadStore((state) =>
    state.files.find((v) => v.isSelected),
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const id = selectedFile?.id;
      if (!id) return;
      addThumbnails(
        id,
        acceptedFiles.map((v) => ({ path: v.path, fileName: v.name })),
      );
    },
  });

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 p-4 flex flex-col gap-3">
        {files.map((v) => (
          <div
            onClick={() => {
              setIsSelected(v.id);
            }}
            key={v.id}
            className={`p-4 border-2 border-blue-500 rounded-xl hover:bg-blue-500 hover:bg-opacity-20 transition-colors cursor-pointer ${
              v.isSelected && 'bg-blue-500 bg-opacity-20'
            }`}
          >
            {v.path}
          </div>
        ))}
      </div>

      <div className="w-1/2 flex flex-col p-4">
        <div
          className="border-dashed border-blue-500 border-2 rounded-xl min-h-unit-20"
          {...getRootProps()}
        >
          {isDragActive && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"
                fill="rgba(70,146,221,1)"
              ></path>
            </svg>
          )}

          {selectedFile?.thumbnails.map((v) => <p>{v.fileName}</p>)}
        </div>

        <button
          onClick={() => {
            addFiles();
          }}
        >
          파일 추가하기
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
