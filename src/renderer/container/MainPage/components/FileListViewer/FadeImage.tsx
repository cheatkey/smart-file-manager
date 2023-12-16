import React, { useEffect, useState } from 'react';

interface IFadeImageProps {
  thumbnails: string[];
  isHover?: boolean;
}

const FadeImage = ({ thumbnails, isHover }: IFadeImageProps) => {
  const hasMultipleImage = thumbnails.length >= 2;

  const [imageSrc, setImageSrc] = useState(thumbnails[0]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (hasMultipleImage === false) return;
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(oldProgress + 2, 100);
      });
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [hasMultipleImage]);

  const changeImageSrc = (newSrc: string) => {
    setImageSrc(newSrc);
  };

  useEffect(() => {
    if (hasMultipleImage === false) return;
    const intervalId = setInterval(() => {
      const maxIndex = thumbnails.length - 1;
      const currentIndex = thumbnails.findIndex((v) => v === imageSrc);

      const nextIndex = (() => {
        if (currentIndex >= maxIndex) return 0;
        return currentIndex + 1;
      })();

      changeImageSrc(thumbnails[nextIndex]);
      setProgress(0);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [hasMultipleImage, imageSrc, thumbnails]);

  return (
    <div className="relative w-full h-full">
      <img className="w-full h-full object-cover" src={imageSrc} />
      {hasMultipleImage && (
        <div
          className={`absolute top-0 left-0 h-1 rounded-br-lg bg-red-500 transition-transform w-full ${
            isHover ? 'scale-105' : ''
          }`}
          style={{
            transform: `translateX(${progress - 100}%)`,
          }}
        ></div>
      )}
    </div>
  );
};

export default FadeImage;
