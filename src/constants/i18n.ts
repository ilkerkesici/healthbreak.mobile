import { I18n } from 'i18n-js';

import de from 'assets/locales/de';
import en from 'assets/locales/en';
import es from 'assets/locales/es';
import fr from 'assets/locales/fr';
import gk from 'assets/locales/gk';
import it from 'assets/locales/it';
import pl from 'assets/locales/pl';
import pt from 'assets/locales/pt';
import tr from 'assets/locales/tr';
import { LanguageType } from 'types/setting';

export const i18n = new I18n({
  [LanguageType.DE]: de,
  [LanguageType.EN]: en,
  [LanguageType.ES]: es,
  [LanguageType.FR]: fr,
  [LanguageType.GK]: gk,
  [LanguageType.IT]: it,
  [LanguageType.PL]: pl,
  [LanguageType.PT]: pt,
  [LanguageType.TR]: tr,
});
i18n.locale = LanguageType.EN;
i18n.defaultLocale = LanguageType.EN;

export const UniversalLanguage = {
  [LanguageType.DE]: 'de-DE',
  [LanguageType.EN]: 'en-US',
  [LanguageType.ES]: 'es-ES',
  [LanguageType.FR]: 'fr-FR',
  [LanguageType.GK]: 'el-GR',
  [LanguageType.IT]: 'it-IT',
  [LanguageType.PL]: 'pl-PL',
  [LanguageType.PT]: 'pt-PT',
  [LanguageType.TR]: 'tr-TR',
};

export const LanguageList = [
  { languageType: LanguageType.DE, i18nKey: 'language.german' },
  { languageType: LanguageType.EN, i18nKey: 'language.english' },
  { languageType: LanguageType.ES, i18nKey: 'language.spanish' },
  { languageType: LanguageType.FR, i18nKey: 'language.french' },
  { languageType: LanguageType.GK, i18nKey: 'language.greek' },
  // {languageType: LanguageType.HI, i18nKey: 'language.indian'},
  // {languageType: LanguageType.HU, i18nKey: 'language.hungarian'},
  // {languageType: LanguageType.ID, i18nKey: 'language.indonesian'},
  { languageType: LanguageType.IT, i18nKey: 'language.italian' },
  // {languageType: LanguageType.JA, i18nKey: 'language.japanese'},
  { languageType: LanguageType.PL, i18nKey: 'language.polish' },
  { languageType: LanguageType.PT, i18nKey: 'language.portuguese' },
  // {languageType: LanguageType.RO, i18nKey: 'language.romanian'},
  { languageType: LanguageType.TR, i18nKey: 'language.turkish' },
  // {languageType: LanguageType.ZH, i18nKey: 'language.chinese'},
];
