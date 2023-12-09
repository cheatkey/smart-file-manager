import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { nanoid } from 'nanoid';
import { createTrackedSelector } from 'react-tracked';

interface IUploadStore {
  files: {
    path: string;
    fileName: string;
    id: string;
    isSelected: boolean;
    thumbnails: { path: string; fileName: string }[];
    tags: string[];
  }[];
  tagList: string[];
}

const initialState: IUploadStore = {
  files: [],
  tagList: [],
};

export const useUploadStore = create(
  immer(
    combine(initialState, (set, get) => ({
      setFiles: (payload: { path: string; name: string }[]) => {
        set((state) => {
          state.files = payload.map((v) => ({
            path: v.path,
            fileName: v.name,
            id: nanoid(),
            isSelected: false,
            thumbnails: [],
            tags: [],
          }));
        });
      },
      setIsSelected: (id: string) => {
        set((state) => {
          state.files.forEach((file) => {
            file.isSelected = false;
          });

          const found = state.files.find((v) => v.id === id);
          const nextValue = !found?.isSelected;
          if (found) found.isSelected = nextValue;
        });
      },
      addThumbnails: (
        id: string,
        paths: { path: string; fileName: string }[],
      ) => {
        set((state) => {
          const found = state.files.find((v) => v.id === id);
          if (found) {
            paths.forEach((path) => {
              found.thumbnails.push(path);
            });
          }
        });
      },
      fetchTagList: async () => {
        const tagListResult = await window.electron.ipcRenderer.invoke(
          'getTagList',
          {},
        );
        if (tagListResult?.data) {
          set((state) => {
            state.tagList = tagListResult.data;
          });
        }
      },
      addFiles: async () => {
        const result = await window.electron.ipcRenderer.invoke('addNewFiles', {
          files: get().files.map((v) => ({
            path: v.path,
            fileName: v.fileName,
            thumbnails: v.thumbnails,
            tags: v.tags,
          })),
        });

        if (result.success) {
          alert('파일 추가 성공');
          set(initialState);
        }
      },
    })),
  ),
);

export const useUploadStoreSelector = createTrackedSelector(useUploadStore);
