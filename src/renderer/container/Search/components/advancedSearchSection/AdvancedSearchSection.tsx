import React, { useState } from 'react';
import { useTagList } from '../../../SelectedFileViewer/hooks/query/useTagList';
import ControlPanel from './ControlPanel';
import FileSelectorTable from './FileSelectorTable';
import { useNavigate } from 'react-router-dom';

interface IAdvancedSearchSectionProps {
  isFocused: boolean;
}
const AdvancedSearchSection = ({ isFocused }: IAdvancedSearchSectionProps) => {
  const { data: tagList } = useTagList();
  const [similarSearchMethod, setSimilarSearchMethod] = useState<
    'tag' | 'memo' | 'thumbnail' | null
  >(null);
  const navigate = useNavigate();
  const pageIndex = similarSearchMethod === null ? 0 : 1;

  const FirstPageJSX = (
    <div className="p-4 flex flex-col">
      <section className="flex flex-col gap-2 border-b-[1px] pb-3 border-stone-600">
        <span className="text-stone-200 font-bold text-lg">Tag</span>
        <div className="flex flex-row gap-2">
          {tagList?.map((tagName) => (
            <span
              onClick={() => {
                navigate(`/search/tag/${tagName}`);
              }}
              key={tagName}
              className="bg-stone-400 rounded-lg text-xs px-2 py-1 w-fit cursor-pointer"
            >
              {tagName}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-2 py-2">
        <span className="text-stone-200 font-bold text-lg">
          Similarity search
        </span>
        <div className="flex flex-col gap-2">
          <span
            className={nextPageMoveClassName}
            onClick={() => setSimilarSearchMethod('memo')}
          >
            {'메모 텍스트 유사도 검색 >'}
          </span>
          <span
            className={nextPageMoveClassName}
            onClick={() => setSimilarSearchMethod('tag')}
          >
            {'태그 유사도 검색 >'}
          </span>
          <span
            className={nextPageMoveClassName}
            onClick={() => setSimilarSearchMethod('thumbnail')}
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
      uiOption={{
        yScroll: pageIndex === 0 ? 'hidden' : 'scroll',
      }}
      pages={[
        FirstPageJSX,
        <FileSelectorTable
          navigateTarget={similarSearchMethod}
          moveToPrev={() => {
            setSimilarSearchMethod(null);
          }}
        />,
      ]}
      pageIndex={pageIndex}
    />
  );
};

export default AdvancedSearchSection;

const nextPageMoveClassName =
  'w-full border-[1px] border-stone-600 px-5 py-3 text-white font-semibold rounded-xl transition-colors cursor-pointer hover:bg-stone-200 hover:text-stone-900';
