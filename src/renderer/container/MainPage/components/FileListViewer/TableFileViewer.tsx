import {
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import dayjs from 'dayjs';

type FileDataType = {
  thumbnails: string[];
  fileName: string;
  id: number;
  memo: string;
  activity: {
    id: number;
    content: string;
    date: Date;
    fileId: number | null;
  }[];
  createdAt: Date;
};

interface ITableFileViewerProps {
  data: FileDataType[];
}

const columnHelper = createColumnHelper<FileDataType>();

const columns = [
  columnHelper.accessor('thumbnails', {
    cell: (info) => (
      <img
        src={info.getValue()[0]}
        className="h-28 rounded-2xl py-1 prevent-drag"
      />
    ),
    size: 250,
    header: () => '',
  }),
  columnHelper.accessor('fileName', {
    header: () => '파일 이름',
    size: 300,
    cell: (info) => info.renderValue(),
    enableSorting: true,
  }),
  columnHelper.accessor('memo', {
    header: () => '메모',
    size: 150,
    cell: (info) => info.renderValue(),
    enableSorting: false,
  }),

  columnHelper.accessor('createdAt', {
    header: () => '파일 생성',
    size: 100,
    cell: (info) => <p className="">{getTimeDifference(info.getValue())}</p>,
    enableSorting: true,
    sortingFn: (a, b, columnID) => {
      return (
        (b.getValue(columnID) as Date).getTime() -
        (a.getValue(columnID) as Date).getTime()
      );
    },
  }),

  columnHelper.accessor('activity', {
    header: () => '최근 조회',
    size: 100,
    cell: (info) => (
      <p className="">{getTimeDifference(info.getValue()[0].date)}</p>
    ),
    enableSorting: true,
    sortingFn: (a, b, columnID) => {
      return (
        ((a as any).getValue(columnID)[0].date as Date).getTime() -
        ((b as any).getValue(columnID)[0].date as Date).getTime()
      );
    },
  }),
];

const TableFileViewer = ({ data }: ITableFileViewerProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
  });

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

const getTimeDifference = (date: Date) => {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diffMonths = now.diff(targetDate, 'month');
  const diffDays = now.diff(targetDate, 'day') % 30;
  const diffHours = now.diff(targetDate, 'hour') % 24;
  const diffMinutes = now.diff(targetDate, 'minute') % 60;

  if (diffMonths > 0) return `${diffMonths}개월 전`;
  if (diffDays > 0 && diffHours > 0) return `${diffDays}일 ${diffHours}시간 전`;
  if (diffHours > 0) return `${diffHours}시간 전`;
  return `${diffMinutes}분 전`;
};
