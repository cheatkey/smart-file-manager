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
  extension,
}: {
  extension: string;
}) => {
  const lowerExtension = extension.toLowerCase();
  if (['csv', 'xlsx'].includes(lowerExtension)) return <FileIcon.Excel />;
  if (['ppt'].includes(lowerExtension)) return <FileIcon.Ppt />;
  if (['docs'].includes(lowerExtension)) return <FileIcon.Word />;
  if (['jpg', 'png', 'gif', 'jpeg'].includes(lowerExtension))
    return <FileIcon.Image />;
};
