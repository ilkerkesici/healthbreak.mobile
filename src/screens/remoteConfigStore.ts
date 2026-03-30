import { create } from 'zustand';

export interface RemoteConfigStoreType {
  remoteConfigReady: boolean;
  setRemoteConfigReady: (remoteConfigReady: boolean) => void;

  packagesVariantBEnabled: boolean;
  setPackagesVariantBEnabled: (packagesVariantBEnabled: boolean) => void;
}

export const useRemoteConfigStore = create<RemoteConfigStoreType>(set => ({
  remoteConfigReady: false,
  setRemoteConfigReady: (remoteConfigReady: boolean) =>
    set(() => ({ remoteConfigReady: remoteConfigReady })),

  packagesVariantBEnabled: false,
  setPackagesVariantBEnabled: (packagesVariantBEnabled: boolean) =>
    set(() => ({ packagesVariantBEnabled: packagesVariantBEnabled })),
}));
