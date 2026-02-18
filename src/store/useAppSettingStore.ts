import {LanguageType, ThemeType} from 'types/setting';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

export interface AppSettingStoreType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;

  language: LanguageType;
  setLanguage: (language: LanguageType) => void;

  hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

// export const useAppSettingStore = create<AppSettingStoreType>()(set => ({
//   theme: 'system',
//   setTheme: (theme: ThemeType) => set({theme}),

//   language: LanguageType.EN,
//   setLanguage: (language: LanguageType) => set({language}),
// }));

export const useAppSettingStore = create<AppSettingStoreType>()(
  persist(
    set => ({
      theme: 'system',
      setTheme: (theme: ThemeType) => set({theme}),

      language: LanguageType.EN,
      setLanguage: (language: LanguageType) => set({language}),

      hasHydrated: false,
      setHasHydrated: (value: boolean) => set({hasHydrated: value}),
    }),
    {
      name: 'app-init-store', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        if (state) {
          state?.setHasHydrated(true);
        } else {
          useAppSettingStore.getState().setHasHydrated(true);
        }
      },
    },
  ),
);
