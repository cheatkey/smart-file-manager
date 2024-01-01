import React from 'react';

interface IControlPanelProps {
  isFocused: boolean;
  pages: React.ReactNode[];
  pageIndex: number;
  uiOption: {
    yScroll: 'hidden' | 'scroll';
  };
}

const ControlPanel = ({
  isFocused,
  pages,
  pageIndex,
  uiOption,
}: IControlPanelProps) => {
  return (
    <div
      className={`bg-stone-900 absolute z-50 rounded-xl default-shadow w-[1000px] flex flex-col transition-all duration-500 ease-in-out animate-expand overflow-x-hidden overflow-y-${
        uiOption.yScroll
      } ${isFocused ? 'h-80' : 'h-0'}`}
      style={{
        top: 60,
      }}
    >
      <div
        className="flex flex-col translate-x-0 transition-all duration-500 ease-in-out"
        style={{
          transform: `translate(${-1000 * pageIndex}px,0)`,
        }}
      >
        {pages.map((page, index) => (
          <div
            className="absolute w-full"
            style={{
              left: `${1000 * index}px`,
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
