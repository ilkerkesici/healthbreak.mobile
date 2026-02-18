import {AppSettingStoreType} from 'store/useAppSettingStore';

export const themeSelector = (state: AppSettingStoreType) => ({
  theme: state.theme,
  setTheme: state.setTheme,
});

export const languageSelector = (state: AppSettingStoreType) => ({
  language: state.language,
  setLanguage: state.setLanguage,
});
