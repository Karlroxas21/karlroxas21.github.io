import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { WINDOW_CONFIG, INITIAL_Z_INDEX } from '@constants/index';
import type { AppItem } from './fileLocation';

interface WindowItem {
    isOpen: boolean,
    zIndex: number,
    data: AppItem | null,
}

export type WindowConfig = {
    [key: string]: WindowItem;
}

interface WindowState {
    windows: WindowConfig;
    nextZIndex: number;
}

interface WindowActions {
    openWindow: (windowKey: string, data?: AppItem | null) => void;
    closeWindow: (windowKey: string) => void;
    focusWindow: (windowKey: string) => void;
}

type WindowStore = WindowState & WindowActions

const useWindowStore = create<WindowStore>()(
    immer(set => ({
        windows: WINDOW_CONFIG,
        nextZIndex: INITIAL_Z_INDEX + 1,
        openWindow: (windowKey: string, data: AppItem | null = null) => set((state) => {
            const win = state.windows[windowKey];
            if (!win) return; // Guard clause for safety

            win.isOpen = true;
            win.zIndex = state.nextZIndex;
            win.data = data ?? win.data;
            state.nextZIndex++;
        }),
        closeWindow: (windowKey) => set(state => {
            const win = state.windows[windowKey];
            if (!win) return;

            win.isOpen = false;
            win.zIndex = INITIAL_Z_INDEX;
            win.data = null;
        }),
        focusWindow: (windowKey) => set(state => {
            const win = state.windows[windowKey];
            if (!win) return;

            win.zIndex = state.nextZIndex++;
        }),
    }))
);

export default useWindowStore;
