import React from 'react';

interface ITileFileViewerProps {
  data: { thumbnails: string[]; fileName: string; id: number }[];
}

const TileFileViewer = ({ data }: ITileFileViewerProps) => {
  return (
    <div className="overflow-hidden flex flex-row flex-wrap">
      {data.map((item) => (
        <div className="relative w-[300px] h-[270px] overflow-hidden group border-2 border-stone-50">
          <img
            className="w-full h-full object-cover"
            src={item.thumbnails[0]}
          />

          <div className="absolute h-24 w-[300px] top-[-6rem] bg-black/40 backdrop-blur-sm group-hover:top-0 transition-all text-white p-2">
            <p className="font-semibold text-base break-all">{item.fileName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileFileViewer;
