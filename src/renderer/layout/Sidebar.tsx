import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LeftSidebarIcon } from '../assets/Icon';

interface ISidebarProps {}

const iconWrapper =
  'cursor-pointer rounded-2xl hover:bg-stone-800 p-2 w-12 h-12 flex items-center justify-center';

const Sidebar = ({}: ISidebarProps) => {
  const navigate = useNavigate();

  return (
    <aside className="min-h-screen w-16 bg-stone-950 flex flex-col p-4 text-white h-screen fixed">
      <div className="h-1/6 flex flex-col items-center"></div>

      <div className="h-4/6 flex flex-col items-center">
        <div
          className={iconWrapper}
          onClick={() => {
            navigate('/');
          }}
        >
          <LeftSidebarIcon.Dashboard />
        </div>

        <div
          className={iconWrapper}
          onClick={() => {
            navigate('/history');
          }}
        >
          <LeftSidebarIcon.History />
        </div>

        <div
          className={iconWrapper}
          onClick={() => {
            navigate('/activity');
          }}
        >
          <LeftSidebarIcon.Activity />
        </div>

        <div
          className={iconWrapper}
          onClick={() => {
            navigate('/search');
          }}
        >
          <LeftSidebarIcon.Search />
        </div>
      </div>

      <div className="h-1/6 flex flex-col items-center justify-end">
        <div className={iconWrapper}>
          <LeftSidebarIcon.Setting />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
