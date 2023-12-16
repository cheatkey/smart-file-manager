import React from 'react';
import { useSelectedFileViewer } from '../../../SelectedFileViewer/hooks/store/useSelectedFileViewer';
import FadeImage from './FadeImage';

interface ITileFileViewerProps {
  data: { thumbnails: string[]; fileName: string; id: number }[];
}

const TileFileViewer = ({ data }: ITileFileViewerProps) => {
  const setFileID = useSelectedFileViewer((state) => state.setFileID);

  return (
    <div className="overflow-hidden flex flex-row flex-wrap">
      {data.map((item) => (
        <div
          onClick={() => {
            setFileID(item.id);
          }}
          className="relative w-[300px] h-[270px] overflow-hidden group border-2 border-stone-50"
        >
          <FadeImage thumbnails={item.thumbnails} />

          <div className="absolute h-24 w-[300px] top-[-6rem] bg-black/40 backdrop-blur-sm group-hover:top-0 transition-all text-white p-2">
            <p className="font-semibold text-base break-all">{item.fileName}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TileFileViewer;
