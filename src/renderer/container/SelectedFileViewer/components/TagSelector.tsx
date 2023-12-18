import React from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useTagList } from '../hooks/query/useTagList';
import { DrawerIcon } from '../../../assets/Icon';
import { selectDarkStyle } from '../../../utils/style/reactSelectstyle';
import { useNavigate } from 'react-router-dom';

interface ITagSelectorProps {
  initialValue: {
    id: number;
    tagName: string;
  }[];
  handleChangeTags: (tagNames: string[]) => void;
}

const TagSelector = ({ initialValue, handleChangeTags }: ITagSelectorProps) => {
  const navigate = useNavigate();
  const { data: allTagList, addNewTag } = useTagList();

  const callAddTagModal = () => {
    Swal.fire({
      title: '태그 추가',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: '추가',
      cancelButtonText: '취소',
      showLoaderOnConfirm: true,
      preConfirm: async (tagName: string) => {
        return addNewTag({
          tagName,
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const getMultiCheckValue = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    try {
      const clickedElement = e.target as unknown as Element;
      if (clickedElement?.className?.includes('MultiValueGeneric')) {
        return clickedElement.innerHTML.trim();
      }
    } catch (err) {
      return null;
    }
  };

  return (
    <div className="flex flex-row gap-2 items-center">
      <div
        onClick={(e) => {
          const tagName = getMultiCheckValue(e);
          if (tagName) {
            navigate(`/search-tag/${tagName}`);
          }
        }}
      >
        <Select
          defaultValue={initialValue.map((v) => ({
            label: v.tagName,
            value: v.tagName,
          }))}
          isMulti
          options={allTagList?.map((v) => ({ label: v, value: v }))}
          styles={selectDarkStyle}
          onChange={(value) => {
            handleChangeTags(
              (value as { label: string }[]).map((v) => v.label),
            );
          }}
        />
      </div>

      <div
        onClick={callAddTagModal}
        className="w-7 h-7 bg-stone-800 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      >
        <DrawerIcon.SmallAdd />
      </div>
    </div>
  );
};

export default TagSelector;
