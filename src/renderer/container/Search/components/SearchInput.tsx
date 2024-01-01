import React, { useRef } from 'react';
import { useClickAway, useToggle } from 'react-use';
import AdvancedSearchSection from './advancedSearchSection/AdvancedSearchSection';

interface ISearchInputProps {}

const SearchInput = ({}: ISearchInputProps) => {
  const [isFocused, setIsFocusd] = useToggle(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickAway(wrapperRef, () => {
    setIsFocusd(false);
  });

  return (
    <div ref={wrapperRef} className="relative flex flex-col gap-4">
      <div
        onClick={() => setIsFocusd(true)}
        className={`rounded-xl h-12 flex flex-row items-center justify-center px-4 gap-2 cursor-pointer transition-all w-[1000px] ${
          isFocused ? 'focused-shadow' : 'default-shadow'
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="fill-stone-600"
            fillRule="evenodd"
            d="M11.5 7a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0m-.82 4.74a6 6 0 1 1 1.06-1.06l3.04 3.04a.75.75 0 1 1-1.06 1.06z"
            clipRule="evenodd"
          />
        </svg>
        <input className="w-full h-full bg-transparent text-stone-950 focus:outline-none" />
      </div>
      <AdvancedSearchSection isFocused={isFocused} setIsFocusd={setIsFocusd} />
    </div>
  );
};

export default SearchInput;
