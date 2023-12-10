import React from 'react';
import { Drawer } from '../../layout/Drawer';
import { useSelectedFileViewer } from './hooks/store/useSelectedFileViewer';
import { useFileInfo } from './hooks/query/useFileInfo';
import { DrawerIcon } from '../../assets/Icon';

const iconWrapper =
  'w-11 h-11 bg-stone-800 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform';

interface ISelectedFileViewerProps {}

const SelectedFileViewer = ({}: ISelectedFileViewerProps) => {
  const fileID = useSelectedFileViewer((state) => state.fileID);
  const setFileID = useSelectedFileViewer((state) => state.setFileID);
  const { data } = useFileInfo(fileID);
  const isOpen = fileID !== null;

  if (!data)
    return (
      <Drawer
        isOpen={isOpen}
        handleOutClick={() => {
          setFileID(null);
        }}
      >
        <p>loading</p>
      </Drawer>
    );

  return (
    <Drawer
      isOpen={isOpen}
      handleOutClick={() => {
        setFileID(null);
      }}
    >
      <div className="flex flex-col p-4 gap-3">
        <img src={data?.thumbnails[0]} className="w-full rounded-2xl" />

        <div className="flex border-dashed border-2 border-stone-500 w-full h-32 rounded-2xl items-center justify-center text-stone-400 font-semibold">
          썸네일 추가
        </div>

        <div className="flex flex-col gap-0 mt-2">
          <p className="font-bold text-xl">{data.fileName}</p>
          <p className="font-medium text-stone-300 text-base">
            여기에는 뭘 쓰지
          </p>
        </div>

        <div className="flex flex-row gap-2">
          <div className={iconWrapper}>
            <DrawerIcon.Click />
          </div>

          <div className={iconWrapper}>
            <DrawerIcon.History />
          </div>

          <div className={iconWrapper}>
            <DrawerIcon.Group />
          </div>

          <div className={iconWrapper}>
            <DrawerIcon.Calendar />
          </div>

          <div className={iconWrapper}>
            <DrawerIcon.Trash />
          </div>
        </div>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">태그</p>
          <p className="font-medium text-base text-stone-200">
            {data.memo.trim().length === 0
              ? '기록된 메모가 없습니다'
              : data.memo}
          </p>
        </section>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">메타데이터</p>
          <p className="font-medium text-base text-stone-200">
            {data.memo.trim().length === 0
              ? '기록된 메모가 없습니다'
              : data.memo}
          </p>
        </section>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">메모</p>
          <p className="font-medium text-base text-stone-200">
            {data.memo.trim().length === 0
              ? '기록된 메모가 없습니다'
              : data.memo}
          </p>
        </section>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">정보</p>
          <table>
            <tr>
              <td>파일 크기</td>
              <td>{formatBytes(data.fileSize)}</td>
            </tr>
            <tr>
              <td>파일 확장자</td>
              <td>{data.extension}</td>
            </tr>
            <tr>
              <td>마지막 조회 시간</td>
              <td>
                {data.activity
                  .filter((v) => v.content === 'open')
                  .at(-1)
                  ?.date.toLocaleString()}
              </td>
            </tr>
          </table>
        </section>
      </div>
    </Drawer>
  );
};

export default SelectedFileViewer;

const formatBytes = (bytes: number) => {
  const decimals = 2;
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
