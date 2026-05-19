import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const localeModules = import.meta.glob('./locales/*.json', { eager: true }) as Record<string, { default: Record<string, unknown> }>;

const getLocaleResources = () => {
  const resources: Record<string, { translation: Record<string, unknown> }> = {};

  for (const [path, module] of Object.entries(localeModules)) {
    const match = path.match(/\/locales\/(.+)\.json$/);
    if (match) {
      const lang = match[1];
      resources[lang] = { translation: module.default };
    }
  }

  return resources;
};

export const initI18n = () => {
  const resources = getLocaleResources();

  return i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      detection: {
        order: ['querystring', 'localStorage', 'navigator'],
        lookupQuerystring: 'lng',
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false
      }
    });
};

export const changeLanguage = (lng: string) => {
  return i18next.changeLanguage(lng);
};

export default i18next;