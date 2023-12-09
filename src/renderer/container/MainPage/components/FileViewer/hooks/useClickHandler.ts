import { useState } from 'react';

export const useClickHandler = ({
  click,
  doubleClick,
}: {
  click: Function;
  doubleClick: Function;
}) => {
  const [clickTimeout, setClickTimeout] = useState<any | null>(null);
  const handleClick = () => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    const timeoutId = setTimeout(() => {
      click();
      setClickTimeout(null);
    }, 200);

    setClickTimeout(timeoutId);
  };

  const handleDoubleClick = () => {
    clearTimeout(clickTimeout);
    doubleClick();
  };

  return {
    handleClick,
    handleDoubleClick,
  };
};
