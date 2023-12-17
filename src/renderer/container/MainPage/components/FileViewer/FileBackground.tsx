import React from 'react';
import { FileIcon } from '../../../../assets/Icon';

export const FileExtensionBackground = ({
  isHover,
  extension,
}: {
  isHover: boolean;
  extension: string;
}) => {
  const lowerExtension = extension.toLowerCase();

  const ExtensionIcon = (() => {
    if (['csv', 'xlsx'].includes(lowerExtension))
      return {
        ml: -6,
        Element: FileIcon.Excel,
      };
    if (['ppt'].includes(lowerExtension))
      return {
        ml: -6,
        Element: FileIcon.Ppt,
      };
    if (['docs'].includes(lowerExtension))
      return {
        ml: -6,
        Element: FileIcon.Word,
      };
    if (['jpg', 'png', 'gif', 'jpeg', 'svg'].includes(lowerExtension))
      return {
        ml: 0,
        Element: FileIcon.Image,
      };
    if (['mp4'].includes(lowerExtension))
      return {
        ml: 0,
        Element: FileIcon.Video,
      };
    if (['pdf'].includes(lowerExtension))
      return {
        ml: 0,
        Element: FileIcon.Docs,
      };
  })();

  if (ExtensionIcon)
    return (
      <div
        className="transition-transform"
        style={
          isHover
            ? {
                transform: 'translateX(0.5%) scale(1.03)',
                marginLeft: `${ExtensionIcon.ml}px`,
              }
            : {
                marginLeft: `${ExtensionIcon.ml}px`,
              }
        }
      >
        <ExtensionIcon.Element />
      </div>
    );
};
