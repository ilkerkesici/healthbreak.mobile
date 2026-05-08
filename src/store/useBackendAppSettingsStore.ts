import { create } from 'zustand';

export interface BackendAppSetting {
  key: string;
  ios_value: string;
  android_value: string;
}

interface BackendAppSettingsStore {
  appSettings: BackendAppSetting[];
  setAppSettings: (appSettings: BackendAppSetting[]) => void;
}

export const useBackendAppSettingsStore = create<BackendAppSettingsStore>(set => ({
  appSettings: [],
  setAppSettings: (appSettings: BackendAppSetting[]) => set({ appSettings }),
}));
