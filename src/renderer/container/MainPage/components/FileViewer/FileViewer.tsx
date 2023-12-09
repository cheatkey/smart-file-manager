import React, { useRef } from 'react';
import { useHoverDirty } from 'react-use';
import { CardFotterIcon } from '../../../../assets/Icon';
import { useElectronStore } from '../../../../utils/hooks/useStore';

interface IFileViewerProps {
  thumbnails: string[];
  fileName: string;
  lastOpen?: Date;
}

const FileViewer = ({ thumbnails, fileName, lastOpen }: IFileViewerProps) => {
  console.log('thumbnails:', thumbnails);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isHovering = useHoverDirty(wrapperRef);
  const [thumbnailPath] = useElectronStore('THUMBNAIL_PATH', '');

  return (
    <div
      ref={wrapperRef}
      className="w-full h-full relative overflow-hidden rounded-xl"
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px',
      }}
    >
      <img
        className={`w-full h-full object-cover transition-transform ${
          isHovering && 'scale-105'
        }`}
        alt="thumbnail"
        src={`${thumbnailPath}/${thumbnails[0]}`}
      ></img>

      <div
        className="absolute z-10 w-full h-16 border-t-2 border-stone-50/30"
        style={{
          bottom: '-10px',
        }}
      >
        <div
          className=" h-full blur-sm"
          style={{
            backdropFilter: 'saturate(1.5)',
            width: '120%',
            marginLeft: '-10%',
            background: 'rgba(255, 255, 255, 0.5)',
          }}
        ></div>
      </div>

      <div
        className="absolute z-20 px-5 flex flex-col justify-between w-full h-7"
        style={{
          bottom: '12px',
        }}
      >
        <div className="flex flex-row items-center gap-2 flex-shrink-0 w-full">
          <div
            className="font-semibold tracking-tight text-lg text-black"
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {fileName}
          </div>

          <p
            className="font-medium tracking-tight text-base text-stone-800"
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            (하루 전)
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileViewer;
