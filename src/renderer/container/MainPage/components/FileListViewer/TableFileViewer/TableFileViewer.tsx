import {
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import dayjs from 'dayjs';
import { isNil } from 'lodash';
import { useSelectedFileViewer } from '../../../../SelectedFileViewer/hooks/store/useSelectedFileViewer';
import useTableFileViewerTable, {
  FileDataType,
} from './hooks/useTableFileViewerTable';

export interface ITableFileViewerProps {
  data: FileDataType[];
  handleClickRow?: (rowData: FileDataType) => void;
}

const TableFileViewer = ({ data, handleClickRow }: ITableFileViewerProps) => {
  const table = useTableFileViewerTable(data);
  const setFileID = useSelectedFileViewer((state) => state.setFileID);

  return (
    <table className="table-fixed border-collapse w-full">
      <thead className="bg-stone-100 text-stone-600 h-14">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                style={{
                  width:
                    header.getSize() === 150 ? 'auto' : `${header.getSize()}px`,
                }}
                onClick={header.column.getToggleSortingHandler()}
                className={`${
                  header.column.getCanSort() && 'cursor-pointer'
                } first:rounded-tl-xl last:rounded-tr-2xl text-left first:pl-4`}
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
                {{
                  asc: ' 🔼',
                  desc: ' 🔽',
                }[header.column.getIsSorted() as string] ?? null}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            onClick={() => {
              if (isNil(handleClickRow)) {
                setFileID(row.original.id);
              } else {
                handleClickRow(row.original);
              }
            }}
            key={row.id}
            className="text-sm border-b-2 border-stone-100 text-stone-700 h-28 hover:bg-stone-50 transition-colors"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                style={{
                  width:
                    cell.column.getSize() === 150
                      ? 'auto'
                      : `${cell.column.getSize()}px`,
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableFileViewer;
