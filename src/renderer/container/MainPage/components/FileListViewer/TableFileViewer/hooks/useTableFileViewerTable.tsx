import {
  Row,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { getTimeDifference } from '../utils/getTimeDifference';
import isNil from 'lodash/isNil';
import { useState } from 'react';
import { ITableFileViewerProps } from '../TableFileViewer';

export type FileDataType = {
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
  rating: number;
  createdAt: Date;
};

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

  columnHelper.accessor('rating', {
    header: () => '점수',
    size: 70,
    cell: (info) => info.renderValue(),
    enableSorting: true,
    sortingFn: (a, b, columnID) => {
      return Number(b.getValue(columnID)) - Number(a.getValue(columnID));
    },
  }),

  columnHelper.accessor('activity', {
    header: () => '최근 조회',
    size: 100,
    cell: (info) => {
      const dateData = info.getValue()?.[0]?.date;
      if (isNil(dateData)) return <p>-</p>;
      return <p className="">{getTimeDifference(dateData)}</p>;
    },
    enableSorting: true,
    sortingFn: (a, b, columnID) => {
      const getTime = (row: Row<FileDataType>) => {
        return (
          ((row as any).getValue(columnID)?.[0]?.date as Date)?.getTime() ??
          Infinity
        );
      };
      return getTime(b) - getTime(a);
    },
  }),
];

const useTableFileViewerTable = (data: ITableFileViewerProps['data']) => {
  const [sorting, setSorting] = useState<SortingState>([]);

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

  return table;
};

export default useTableFileViewerTable;
