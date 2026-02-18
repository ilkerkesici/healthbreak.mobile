import { UniversalLanguage, i18n } from 'constants/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { LanguageType } from 'types/setting';
import { LocalStorageType } from 'constants/localstorage';
import { useCallback, useMemo } from 'react';
import { useAppSettingStore } from 'store/useAppSettingStore';
// import OneSignalHelper from 'helpers/OneSignalHelper';
import { getDeviceLocale } from 'react-native-get-device-locale';

export const primaryLanguage = [
  LanguageType.IT,
  LanguageType.TR,
  LanguageType.EN,
];

const useTranslation = () => {
  const { language, setLanguage } = useAppSettingStore();

  const updateLanguage = useCallback(
    async (lang: LanguageType) => {
      i18n.locale = lang;
      setLanguage(lang);
      await AsyncStorage.setItem(LocalStorageType.LANGUAGE, lang);
      // OneSignalHelper.updateLanguage(lang);
    },
    [setLanguage],
  );
  const initTranslation = useCallback(async () => {
    const localLanguage = await AsyncStorage.getItem(LocalStorageType.LANGUAGE);
    const locale: string = await getDeviceLocale();
    if (localLanguage) {
      i18n.locale = localLanguage;
      setLanguage(localLanguage as LanguageType);
    } else {
      const localeShort = locale.toLowerCase();
      if (localeShort.includes('tr')) {
        i18n.locale = LanguageType.TR;
        setLanguage(LanguageType.TR);
      } else if (localeShort.includes('it')) {
        i18n.locale = LanguageType.IT;
        setLanguage(LanguageType.IT);
      } else if (localeShort.includes('fr')) {
        i18n.locale = LanguageType.FR;
        setLanguage(LanguageType.FR);
      } else if (localeShort.includes('es')) {
        i18n.locale = LanguageType.ES;
        setLanguage(LanguageType.ES);
      } else if (localeShort.includes('pt')) {
        i18n.locale = LanguageType.PT;
        setLanguage(LanguageType.PT);
      } else if (localeShort.includes('de')) {
        i18n.locale = LanguageType.DE;
        setLanguage(LanguageType.DE);
      } else if (
        localeShort.includes('el') ||
        localeShort.includes('gr') ||
        localeShort.includes('gk')
      ) {
        i18n.locale = LanguageType.DE;
        setLanguage(LanguageType.DE);
      } else if (localeShort.includes('pl')) {
        i18n.locale = LanguageType.PL;
        setLanguage(LanguageType.PL);
      } else {
        i18n.locale = LanguageType.EN;
        setLanguage(LanguageType.EN);
      }
    }
  }, [setLanguage]);

  const universalLanguage = useMemo(
    () => UniversalLanguage[language],
    [language],
  );

  return {
    i18n,
    language,
    universalLanguage,
    updateLanguage,
    initTranslation,
  };
};

export default useTranslation;
