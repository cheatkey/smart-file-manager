import React from 'react';
import { Rating } from 'react-simple-star-rating';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Drawer } from '../../layout/Drawer';
import { useSelectedFileViewer } from './hooks/store/useSelectedFileViewer';
import { useFileInfo } from './hooks/query/useFileInfo';
import { DrawerIcon } from '../../assets/Icon';
import ThumbnailRenderer from './components/ThumbnailRender';
import DebouncedTextarea from './components/DebouncedTextarea';
import TagSelector from './components/TagSelector';
import JsonEditTable from './components/JsonEditTable';
import AddDragFile from './components/AddDragFile';
import { useNavigate } from 'react-router-dom';
import Tooltip from '../../components/Tooltip';

const iconWrapper =
  'w-11 h-11 bg-stone-800 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform';

interface ISelectedFileViewerProps {}

const SelectedFileViewer = ({}: ISelectedFileViewerProps) => {
  const fileID = useSelectedFileViewer((state) => state.fileID);
  const setFileID = useSelectedFileViewer((state) => state.setFileID);
  const { data, handler } = useFileInfo(fileID);

  const isOpen = fileID !== null;

  const navigate = useNavigate();

  const callDeleteConfirmModal = () => {
    Swal.fire({
      animation: false,
      title: '파일 삭제',
      showCancelButton: true,
      confirmButtonText: '추가',
      cancelButtonText: '취소',
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        return handler.removeFile();
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

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

  const historyFiles = [
    ...data.history.slice(0, -1).map((fileName, index) => ({
      fileName,
      index: index + 1,
    })),
  ].reverse();

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

          <AddDragFile
            handleOnDrop={(acceptedFiles) => {
              handler.addThumbnail(
                acceptedFiles.map((v) => ({
                  path: v.path,
                  fileName: v.name,
                })),
              );
            }}
          >
            썸네일 추가
          </AddDragFile>
        </section>

        <div className="flex flex-col gap-0 mt-2">
          <DebouncedTextarea
            initialValue={data.fileName}
            onDebouncedChange={(fileName) => {
              handler.setTitle(fileName);
            }}
            uiOption={{
              isOneLine: true,
            }}
          />

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
          <Tooltip content="파일 열기">
            <div
              className={iconWrapper}
              onClick={() => {
                window.electron.ipcRenderer.invoke('openFile', {
                  id: data.id,
                });
              }}
            >
              <DrawerIcon.Click />
            </div>
          </Tooltip>

          <Tooltip content="썸네일이 유사한 파일 검색">
            <div
              className={iconWrapper}
              onClick={() => {
                navigate(`/search/similar/thumbnail/${fileID}`);
              }}
            >
              <DrawerIcon.ThumbnailSearch />
            </div>
          </Tooltip>

          <Tooltip content="태그가 비슷한 파일 검색">
            <div
              className={iconWrapper}
              onClick={() => {
                navigate(`/search/similar/tag/${fileID}`);
              }}
            >
              <DrawerIcon.SearchSimilarTags />
            </div>
          </Tooltip>

          <Tooltip content="메모가 유사한 파일 검색">
            <div
              className={iconWrapper}
              onClick={() => {
                navigate(`/search/similar/memo/${fileID}`);
              }}
            >
              <DrawerIcon.SearchMemo />
            </div>
          </Tooltip>

          <Tooltip content="파일 삭제">
            <div className={iconWrapper} onClick={callDeleteConfirmModal}>
              <DrawerIcon.Trash />
            </div>
          </Tooltip>
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
          <JsonEditTable
            onDebouncedChange={(metadata) => {
              handler.setMetadata(metadata);
            }}
            initialValue={JSON.parse(data.metadata)}
          />
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

        <section className="flex flex-col gap-2">
          <p className="font-semibold text-lg text-stone-100">버전 관리</p>

          {historyFiles.map((v) => (
            <div className="flex flex-row gap-2 items-center group">
              <span className="bg-stone-800 py-1 px-3 rounded-lg text-sm">
                {v.index}
              </span>{' '}
              <p
                className="cursor-pointer"
                onClick={() => {
                  window.electron.ipcRenderer.invoke('openFile', {
                    id: data.id,
                    historyFile: v.fileName,
                  });
                }}
              >
                {v.fileName}
              </p>
              <p
                className="hidden group-hover:block cursor-pointer"
                onClick={() => {
                  handler.deleteVersion(v.fileName);
                }}
              >
                <DrawerIcon.SmallX />
              </p>
            </div>
          ))}

          <AddDragFile
            handleOnDrop={(acceptedFiles) => {
              handler.addNewVersionFile({
                path: acceptedFiles[0].path,
                fileName: acceptedFiles[0].name,
              });
            }}
          >
            새로운 버전 파일 추가
          </AddDragFile>
        </section>
      </div>
    </Drawer>
  );
};

export default SelectedFileViewer;

const formatBytes = (bytes: number, decimals: number = 2) => {
  if (bytes === 0) return '0 KB';

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};
