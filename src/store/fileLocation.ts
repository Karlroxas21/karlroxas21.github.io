import { ABOUT_LOCATION, RESUME_LOCATION, EXPERIENCE_LOCATION, WORK_LOCATION } from '@constants/index';
import { immer } from 'zustand/middleware/immer';
import { create } from 'zustand/react';

export type AppItem = {
    id: number;
    name: string;
    icon: string;
    kind: 'file' | 'folder';
    type?: string;
    position: string;
    windowPosition?: string;
    fileType?: 'txt' | 'url' | 'img' | 'fig' | 'pdf';
    description?: string[];
    subtitle?: string;
    image?: string;
    imageUrl?: string;
    href?: string;
    children?: AppItem[];
};

export const locations = {
    work: WORK_LOCATION as AppItem,
    about: ABOUT_LOCATION as AppItem,
    resume: RESUME_LOCATION as AppItem,
    experience: EXPERIENCE_LOCATION as AppItem,
};

export type LocationKey = keyof typeof locations;

type State = {
    activeLocation: LocationKey;
    selectedWorkId: number | null;
};

type Actions = {
    setActiveLocation: (location: LocationKey) => void;
    resetActiveLocation: () => void;
    setSelectedWorkId: (id: number | null) => void;
};
const useLocationStore = create<State & Actions>()(
    immer(set => ({
        activeLocation: 'work',

        setActiveLocation: (location: LocationKey) =>
            set(state => {
                state.activeLocation = location;
            }),

        resetActiveLocation: () =>
            set(state => {
                state.activeLocation = 'work';
            }),
        selectedWorkId: null,
        setSelectedWorkId: (id: number | null) =>
            set(state => {
                state.selectedWorkId = id;
            }),
    }))
);

export default useLocationStore;
