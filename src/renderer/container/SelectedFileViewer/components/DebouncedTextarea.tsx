import React, { useState } from 'react';
import { useDebounce } from 'react-use';

interface IDebouncedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  initialValue: string;
  onDebouncedChange: (content: string) => void;
}

const DebouncedTextarea = ({
  initialValue,
  onDebouncedChange,
}: IDebouncedTextareaProps) => {
  const [value, setValue] = useState<string>(initialValue);

  useDebounce(
    () => {
      if (initialValue !== value) onDebouncedChange(value);
    },
    500,
    [value],
  );

  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="resize-none font-medium text-base text-stone-200 bg-transparent focus:outline-stone-800"
    ></textarea>
  );
};

export default DebouncedTextarea;
