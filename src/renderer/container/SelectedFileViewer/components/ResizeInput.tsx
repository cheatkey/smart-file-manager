import React, { useState, useRef, useEffect } from 'react';

interface IResizeInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const ResizeInput = (props: IResizeInputProps) => {
  const [width, setWidth] = useState(0);
  const span = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (span.current) setWidth(span.current.offsetWidth);
  }, [props.value]);

  return (
    <div>
      <span
        id="hide"
        ref={span}
        className="absolute opacity-0 whitespace-pre -z-10"
      >
        {props.value}
      </span>
      <input
        className={`bg-transparent text-stone-50 w-full focus:outline-stone-500 ${props.className}`}
        type="text"
        style={{ width: width > 20 ? width : 20, ...props.style }}
        {...props}
      />
    </div>
  );
};

export default ResizeInput;
