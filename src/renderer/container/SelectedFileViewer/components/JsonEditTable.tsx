import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import { useDebounce } from 'react-use';
import isEqual from 'lodash/isEqual';
import { DrawerIcon } from '../../../assets/Icon';
import ResizeInput from './ResizeInput';
import { useNavigate } from 'react-router-dom';

interface IJsonEditTableProps {
  onDebouncedChange: (payload: Record<string, string>) => void;
  initialValue: Record<string, string>;
}

const JsonEditTable = ({
  onDebouncedChange,
  initialValue,
}: IJsonEditTableProps) => {
  const navigate = useNavigate();
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
      <table className="table-fixed w-full border-zinc-700 border-2">
        {jsonData.map(([key, value], index) => (
          <tr>
            <td className="w-20 border-zinc-700 border-2">
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
            <td className="w-56 border-zinc-700 border-2">
              <div className="flex flex-row items-center gap-2">
                <ResizeInput
                  value={value}
                  onChange={(event) => {
                    setJsonData((draft) => {
                      draft[index][1] = event.target.value;
                    });
                  }}
                />
                <div
                  className="w-6 h-6 bg-stone-800 rounded-lg flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    navigate(`/search/metadata/${key}/${value}`);
                  }}
                >
                  <DrawerIcon.RightArrow />
                </div>
              </div>
            </td>
          </tr>
        ))}
      </table>

      <div className="flex justify-center py-1">
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
    </div>
  );
};

export default JsonEditTable;
