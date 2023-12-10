import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDropzone } from 'react-dropzone';
import { Drawer } from '../../layout/Drawer';
import { useSelectedFileViewer } from './hooks/store/useSelectedFileViewer';
import { useFileInfo } from './hooks/query/useFileInfo';
import { DrawerIcon } from '../../assets/Icon';
import ThumbnailRenderer from './components/ThumbnailRender';
import DebouncedTextarea from './components/DebouncedTextarea';
import { toast } from 'react-hot-toast';
import TagSelector from './components/TagSelector';

const iconWrapper =
  'w-11 h-11 bg-stone-800 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform';

interface ISelectedFileViewerProps {}

const SelectedFileViewer = ({}: ISelectedFileViewerProps) => {
  const fileID = useSelectedFileViewer((state) => state.fileID);
  const setFileID = useSelectedFileViewer((state) => state.setFileID);
  const { data, handler } = useFileInfo(fileID);
  const isOpen = fileID !== null;

  const { getRootProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) =>
      handler.addThumbnail(
        acceptedFiles.map((v) => ({
          path: v.path,
          fileName: v.name,
        })),
      ),
    noClick: true,
  });

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
        <section className="flex flex-col gap-3">
          {data?.thumbnails.map((thumbnail, deletedThumbnailIndex) => (
            <ThumbnailRenderer
              key={thumbnail}
              imageUrl={thumbnail}
              handleDeleteImage={() => {
                handler.deleteThumbnail(deletedThumbnailIndex);
              }}
            />
          ))}

          <div
            {...getRootProps()}
            className={`flex border-dashed border-2 w-full h-32 rounded-2xl items-center justify-center font-semibold transition-colors ${
              isDragActive
                ? 'border-stone-400 text-stone-300'
                : 'border-stone-500 text-stone-400'
            }`}
          >
            썸네일 추가
          </div>
        </section>

        <div className="flex flex-col gap-0 mt-2">
          <p className="font-bold text-xl">{data.fileName}</p>
          <p className="font-medium text-base">여기에는 뭘 쓰지</p>
          <Rating
            initialValue={data.rating}
            onClick={(value) => {
              handler.setRating(value);
            }}
            allowFraction
            transition
            SVGclassName="inline-block"
            size={32}
          />
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
            <DrawerIcon.Trash />
          </div>
        </div>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">태그</p>
          <TagSelector
            initialValue={data.tags}
            handleChangeTags={handler.setTags}
          />
        </section>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">메타데이터</p>
          TODO
        </section>

        <section className="flex flex-col">
          <p className="font-semibold text-lg text-stone-100">메모</p>
          <DebouncedTextarea
            initialValue={data.memo}
            onDebouncedChange={(content) => {
              handler.setMemo(content);
            }}
          />
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
            <tr>
              <td>파일 추가 날짜</td>
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
