import React from 'react';

interface IThumbnailRendererProps {
  imageUrl: string;
  handleDeleteImage: () => void;
}

const ThumbnailRenderer = ({
  imageUrl,
  handleDeleteImage,
}: IThumbnailRendererProps) => {
  return (
    <div className="relative w-full group">
      <img src={imageUrl} className="w-full rounded-2xl" />
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button onClick={handleDeleteImage} type="button">
          <svg
            width="28"
            height="28"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="fill-red-500"
              d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3zm0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5zm-3.78 5.78l-1.44 1.44L14.564 16l-3.782 3.78l1.44 1.44L16 17.437l3.78 3.78l1.44-1.437L17.437 16l3.78-3.78l-1.437-1.44L16 14.564l-3.78-3.782z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ThumbnailRenderer;
