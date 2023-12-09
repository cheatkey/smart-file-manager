import React from 'react';
import { Icon } from '../assets/Icon';

interface ISidebarProps {}

const iconWrapper =
  'cursor-pointer rounded-2xl hover:bg-stone-800 p-2 w-12 h-12 flex items-center justify-center';

const Sidebar = ({}: ISidebarProps) => {
  return (
    <aside className="min-h-screen w-16 bg-stone-950 flex flex-col p-4 text-white">
      <div className="h-1/6 flex flex-col items-center">
        <div className={iconWrapper}>
          <Icon.Rocket />
        </div>
      </div>

      <div className="h-4/6 flex flex-col items-center">
        <div className={iconWrapper}>
          <Icon.Dashboard />
        </div>

        <div className={iconWrapper}>
          <Icon.History />
        </div>

        <div className={iconWrapper}>
          <Icon.Activity />
        </div>

        <div className={iconWrapper}>
          <Icon.Search />
        </div>
      </div>

      <div className="h-1/6 flex flex-col items-center justify-end">
        <div className={iconWrapper}>
          <Icon.Setting />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
