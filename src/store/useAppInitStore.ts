import AsyncStorage from '@react-native-async-storage/async-storage';
import { OnboardingProfile, User } from 'types/models';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AppInitStoreType {
  token?: string;
  user?: User;
  setUserInfo: (token: string, user: User) => void;
  setToken: (token?: string) => void;
  setUser: (user?: User) => void;

  profile?: OnboardingProfile | undefined;
  setProfile: (profile?: OnboardingProfile) => void;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useAppInitStore = create<AppInitStoreType>()(
  persist(
    set => ({
      token: undefined,
      user: undefined,
      setUserInfo: (token: string, user: User) =>
        set({ token: token, user: user }),
      setToken: (token?: string) => set({ token: token }),
      setUser: (user?: User) => set({ user: user }),

      profile: undefined,
      setProfile: (profile?: OnboardingProfile) => set({ profile: profile }),

      hasHydrated: false,
      setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
    }),
    {
      name: 'app-init-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state?.setHasHydrated(true);
        } else {
          useAppInitStore.getState().setHasHydrated(true);
        }
      },
    },
  ),
);
