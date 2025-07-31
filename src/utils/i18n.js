import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from '../locales/en.json';
import es from '../locales/es.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (cb) => {
    const locales = RNLocalize.getLocales();
    cb(locales[0]?.languageCode || 'en');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });
