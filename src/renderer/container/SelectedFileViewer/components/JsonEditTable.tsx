import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { useDebounce } from 'react-use';
import isEqual from 'lodash/isEqual';
import { DrawerIcon } from '../../../assets/Icon';

interface IJsonEditTableProps {
  onDebouncedChange: (payload: Record<string, string>) => void;
  initialValue: Record<string, string>;
}

const JsonEditTable = ({
  onDebouncedChange,
  initialValue,
}: IJsonEditTableProps) => {
  console.log('initialValue:', initialValue);
  const [jsonData, setJsonData] = useImmer<string[][]>(
    Object.entries(initialValue),
  );

  useDebounce(
    () => {
      if (isEqual(jsonData, Object.entries(initialValue)) === false)
        onDebouncedChange(Object.fromEntries(jsonData));
    },
    500,
    [jsonData],
  );

  return (
    <div className="flex flex-col w-full">
      <table className="table-fixed w-full">
        {jsonData.map(([key, value], index) => (
          <tr>
            <td className="w-20">
              <input
                className="bg-transparent text-stone-50 w-full font-bold focus:outline-stone-500"
                value={key}
                onChange={(event) => {
                  setJsonData((draft) => {
                    draft[index][0] = event.target.value;
                  });
                }}
              />
            </td>
            <td className="w-56">
              <input
                className="bg-transparent text-stone-50 w-full focus:outline-stone-500"
                value={value}
                onChange={(event) => {
                  setJsonData((draft) => {
                    draft[index][1] = event.target.value;
                  });
                }}
              />
            </td>
          </tr>
        ))}
      </table>

      <div
        onClick={() => {
          setJsonData((draft) => {
            draft.push(['', '']);
          });
        }}
        className="w-7 h-7 bg-stone-800 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      >
        <DrawerIcon.SmallAdd />
      </div>
    </div>
  );
};

export default JsonEditTable;
