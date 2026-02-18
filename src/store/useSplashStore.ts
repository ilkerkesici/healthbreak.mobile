import {create} from 'zustand';

export interface SplashStoreType {
  visible: boolean;
  setVisible: (status: boolean) => void;
  closeSplash: () => void;
}

export const useSplashStore = create<SplashStoreType>()(set => ({
  visible: true,
  setVisible: (status: boolean) => set({visible: status}),
  closeSplash: () => set({visible: false}),
}));
