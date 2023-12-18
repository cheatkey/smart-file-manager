import React from 'react';

interface IControlPanelProps {
  isFocused: boolean;
  pages: React.ReactNode[];
  pageIndex: number;
}

const ControlPanel = ({ isFocused, pages, pageIndex }: IControlPanelProps) => {
  return (
    <div
      className={`bg-stone-900 relative rounded-xl default-shadow w-[800px] flex flex-col transition-all duration-500 ease-in-out animate-expand overflow-x-hidden overflow-y-auto ${
        isFocused ? 'h-96' : 'h-0'
      }`}
    >
      <div
        className="flex flex-col translate-x-0 transition-all duration-500 ease-in-out"
        style={{
          transform: `translate(${-800 * pageIndex}px,0)`,
        }}
      >
        {pages.map((page, index) => (
          <div
            className="absolute w-full"
            style={{
              left: `${800 * index}px`,
            }}
          >
            {page}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ControlPanel;
