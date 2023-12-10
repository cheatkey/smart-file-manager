import React, { useRef, useState } from 'react';
import { useClickAway } from 'react-use';

interface IDrawerProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleOutClick: () => void;
}

export const Drawer = ({ children, isOpen, handleOutClick }: IDrawerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => {
    handleOutClick();
  });

  return (
    <div
      ref={ref}
      style={{
        boxShadow:
          'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
      }}
      className={`z-50 fixed top-0 right-0 h-full text-stone-50 bg-stone-950 w-96 overflow-auto 
                      transform transition-transform duration-200 ease-in-out
                      ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
    >
      {children}
    </div>
  );
};
