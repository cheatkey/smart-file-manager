import React from 'react';
import { useFileList } from '../../../MainPage/hooks/query/useFileList';
import TableFileViewer from '../../../MainPage/components/FileListViewer/TableFileViewer/TableFileViewer';
import { useNavigate } from 'react-router-dom';

interface IFileSelectorTableProps {
  navigateTarget: string;
  moveToPrev: () => void;
}

const FileSelectorTable = ({
  navigateTarget,
  moveToPrev,
}: IFileSelectorTableProps) => {
  const navigate = useNavigate();
  const fileList = useFileList();

  return (
    <div className="bg-stone-50">
      <p
        className="py-3 px-4 font-semibold text-stone-600 cursor-pointer transition-colors hover:text-stone-800"
        onClick={moveToPrev}
      >
        {'< 돌아가기'}
      </p>
      <TableFileViewer
        data={fileList.data ?? []}
        handleClickRow={(row) => {
          navigate(`/search/similar/${navigateTarget}/${row.id}`);
        }}
      />
    </div>
  );
};

export default FileSelectorTable;
