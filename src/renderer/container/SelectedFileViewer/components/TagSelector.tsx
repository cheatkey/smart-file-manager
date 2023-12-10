import React from 'react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useTagList } from '../hooks/query/useTagList';
import { DrawerIcon } from '../../../assets/Icon';
import { selectDarkStyle } from '../../../utils/style/reactSelectstyle';

interface ITagSelectorProps {
  initialValue: {
    id: number;
    tagName: string;
  }[];
  handleChangeTags: (tagNames: string[]) => void;
}

const TagSelector = ({ initialValue, handleChangeTags }: ITagSelectorProps) => {
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

  console.log(
    'initialValue.map((v) => v.tagName)',
    initialValue.map((v) => v.tagName),
    allTagList?.map((v) => ({ label: v, value: v })),
  );

  return (
    <div className="flex flex-row gap-2">
      <Select
        defaultValue={initialValue.map((v) => ({
          label: v.tagName,
          value: v.tagName,
        }))}
        isMulti
        options={allTagList?.map((v) => ({ label: v, value: v }))}
        styles={selectDarkStyle}
        onChange={(value) => {
          handleChangeTags((value as { label: string }[]).map((v) => v.label));
        }}
      />

      <div
        onClick={callAddTagModal}
        className="w-9 h-9 bg-stone-800 rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
      >
        <DrawerIcon.Add />
      </div>
    </div>
  );
};

export default TagSelector;
