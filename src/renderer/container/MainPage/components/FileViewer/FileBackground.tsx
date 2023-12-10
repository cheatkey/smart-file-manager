import React from 'react';
import { FileIcon } from '../../../../assets/Icon';

export const ImageBackgroundBackground = ({
  isHover,
  thumbnail,
}: {
  isHover: boolean;
  thumbnail: string;
}) => (
  <img
    className={`w-full h-full object-cover transition-transform ${
      isHover ? 'scale-105' : ''
    }`}
    alt="thumbnail"
    src={thumbnail}
  ></img>
);

export const FileExtensionBackground = ({
  isHover,
  extension,
}: {
  isHover: boolean;
  extension: string;
}) => {
  const lowerExtension = extension.toLowerCase();

  const IconElement = (() => {
    if (['csv', 'xlsx'].includes(lowerExtension)) return FileIcon.Excel;
    if (['ppt'].includes(lowerExtension)) return FileIcon.Ppt;
    if (['docs'].includes(lowerExtension)) return FileIcon.Word;
    if (['jpg', 'png', 'gif', 'jpeg'].includes(lowerExtension))
      return FileIcon.Image;
    if (['mp4'].includes(lowerExtension)) return FileIcon.Video;
  })();

  if (IconElement)
    return (
      <div
        className="transition-transform"
        style={
          isHover
            ? {
                transform: 'translateX(0.5%) scale(1.03)',
              }
            : {}
        }
      >
        <IconElement />
      </div>
    );
};
