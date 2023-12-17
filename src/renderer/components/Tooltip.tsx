import React from 'react';

interface ITooltipProps {
  content: string;
  children: React.ReactNode;
}

const Tooltip = ({ content, children }: ITooltipProps) => {
  return (
    <div className="has-tooltip relative">
      <span
        className="tooltip rounded shadow-lg px-3 py-1 text-stone-50 -mt-10 backdrop-blur-xl whitespace-nowrap"
        style={{
          left: `-${Math.floor(getTextWidth(content) / 2)}px`,
        }}
      >
        {content}
      </span>
      {children}
    </div>
  );
};

export default Tooltip;

const getTextWidth = (text: string) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) throw new Error();
  context.font = 'Pretendard Variable';
  const metrics = context.measureText(text);
  return metrics.width;
};
