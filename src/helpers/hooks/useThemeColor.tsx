import { useCallback, useMemo } from 'react';
import { Appearance } from 'react-native';
import { colorPalette, ColorType } from 'assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorageType } from 'constants/localstorage';
import { ThemeType } from 'types/setting';
import { useAppSettingStore } from 'store/useAppSettingStore';

export const useTheme = () => {
  // const defaultTheme = Appearance.getColorScheme();

  // const { theme, setTheme } = useAppSettingStore();

  // const selectTheme = useCallback(
  //   async (newTheme: ThemeType) => {
  //     setTheme(newTheme);
  //     await AsyncStorage.setItem(LocalStorageType.THEME, newTheme);
  //   },
  //   [setTheme],
  // );

  // const getLocalSelection = useCallback(async () => {
  //   const result = await AsyncStorage.getItem(LocalStorageType.THEME);
  //   if (!result) {
  //     return;
  //   }
  //   if (result === 'dark') {
  //     setTheme('dark');
  //   } else if (result === 'light') {
  //     setTheme('light');
  //   } else {
  //     setTheme('system');
  //   }
  // }, [setTheme]);

  // const isDarkMode = useMemo(
  //   () => (theme === 'system' ? defaultTheme === 'dark' : theme === 'dark'),
  //   [theme, defaultTheme],
  // );

  return {
    theme: 'dark',
    isDarkMode: true,
    // selectTheme,
    // getLocalSelection,
  };
};

export const useThemeColor = (colorKey?: Array<ColorType | undefined>) => {
  const { isDarkMode } = useTheme();

  const palette = useMemo(() => colorPalette(!isDarkMode), [isDarkMode]);

  const hexList: string[] = [];
  colorKey?.forEach(d => {
    if (d) {
      hexList.push(palette[d]);
    }
  });

  return hexList;
};
