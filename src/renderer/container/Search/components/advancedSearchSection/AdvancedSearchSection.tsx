import React, { useState } from 'react';
import { useTagList } from '../../../SelectedFileViewer/hooks/query/useTagList';
import ControlPanel from './ControlPanel';
import FileSelectorTable from './FileSelectorTable';

interface IAdvancedSearchSectionProps {
  isFocused: boolean;
}
const AdvancedSearchSection = ({ isFocused }: IAdvancedSearchSectionProps) => {
  const { data: tagList } = useTagList();
  const [pageIndex, setPageIndex] = useState<number>(0);

  const FirstPageJSX = (
    <div className="p-4 flex flex-col">
      <section className="flex flex-col gap-2 border-b-[1px] pb-4 border-stone-600">
        <span className="text-stone-200 font-bold text-lg">Tag</span>
        <div className="flex flex-row gap-2">
          {tagList?.map((tagName) => (
            <span
              key={tagName}
              className="bg-stone-400 rounded-lg text-xs px-2 py-1 w-fit cursor-pointer"
            >
              {tagName}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2 py-4">
        <span className="text-stone-200 font-bold text-lg">
          Similarity search
        </span>
        <div className="flex flex-col gap-2">
          <span
            className={nextPageMoveClassName}
            onClick={() => setPageIndex(1)}
          >
            {'메모 텍스트 유사도 검색 >'}
          </span>
          <span
            className={nextPageMoveClassName}
            onClick={() => setPageIndex(1)}
          >
            {'태그 유사도 검색 >'}
          </span>
          <span
            className={nextPageMoveClassName}
            onClick={() => setPageIndex(1)}
          >
            {'썸네일 이미지 유사도 검색 >'}
          </span>
        </div>
      </section>
    </div>
  );

  return (
    <ControlPanel
      isFocused={isFocused}
      pages={[FirstPageJSX, <FileSelectorTable />]}
      pageIndex={pageIndex}
    />
  );
};

export default AdvancedSearchSection;

const nextPageMoveClassName =
  'w-full border-[1px] border-stone-600 px-5 py-3 text-white font-semibold rounded-xl transition-colors cursor-pointer hover:bg-stone-200 hover:text-stone-900';
