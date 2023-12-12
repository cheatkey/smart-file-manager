import React from 'react';
import { useDropzone } from 'react-dropzone';

interface IAddDragFileProps {
  handleOnDrop: (acceptedFiles: File[]) => void;
  children: React.ReactNode;
}

const AddDragFile = ({ handleOnDrop, children }: IAddDragFileProps) => {
  const { getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => handleOnDrop(acceptedFiles),
    noClick: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex border-dashed border-2 w-full h-32 rounded-2xl items-center justify-center font-semibold transition-colors ${
        isDragActive
          ? 'border-stone-400 text-stone-300'
          : 'border-stone-500 text-stone-400'
      }`}
    >
      {children}
    </div>
  );
};

export default AddDragFile;
