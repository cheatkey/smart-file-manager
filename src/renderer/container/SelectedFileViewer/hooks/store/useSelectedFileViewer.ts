import { create } from 'zustand';
import { combine } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface ISelectedFileViewerState {
  fileID: number | null;
}
const initialState: ISelectedFileViewerState = {
  fileID: null,
};

export const useSelectedFileViewer = create(
  immer(
    combine(initialState, (set, get) => ({
      setFileID: (payload: ISelectedFileViewerState['fileID']) => {
        set((state) => {
          state.fileID = payload;
        });
      },
    })),
  ),
);
