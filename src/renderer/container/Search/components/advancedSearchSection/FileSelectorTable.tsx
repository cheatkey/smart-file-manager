import React from 'react';
import { useFileList } from '../../../MainPage/hooks/query/useFileList';
import TableFileViewer from '../../../MainPage/components/FileListViewer/TableFileViewer';

interface IFileSelectorTableProps {}

const FileSelectorTable = ({}: IFileSelectorTableProps) => {
  const fileList = useFileList();

  return <TableFileViewer data={fileList.data} />;
};

export default FileSelectorTable;
