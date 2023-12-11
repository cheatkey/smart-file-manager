import React from 'react';

interface ITileFileViewerProps {
  thumbnails: string[];
  fileName: string;
  id: number;
}

const TileFileViewer = ({ thumbnails, fileName, id }: ITileFileViewerProps) => {
  return (
    <div className="relative aspect-w-1 aspect-h-1 overflow-hidden group">
      <img className="w-full h-full" src={thumbnails[0]} />

      <div className="absolute h-24 top-[-6rem] bg-black/40 backdrop-blur-sm group-hover:top-0 transition-all text-white p-2">
        <p className="font-semibold text-base break-all">{fileName}</p>
      </div>
    </div>
  );
};

export default TileFileViewer;
