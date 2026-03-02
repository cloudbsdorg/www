import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import tlh from './locales/tlh.json';
import eo from './locales/eo.json';
import fi from './locales/fi.json';
import ko from './locales/ko.json';
import ja from './locales/ja.json';
import ru from './locales/ru.json';
import pl from './locales/pl.json';
import pt from './locales/pt.json';
import sv from './locales/sv.json';
import no from './locales/no.json';
import de from './locales/de.json';
import sjn from './locales/sjn.json';
import dth from './locales/dth.json';
import qvy from './locales/qvy.json';
import nav from './locales/nav.json';
import atl from './locales/atl.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  zh: { translation: zh },
  ar: { translation: ar },
  hi: { translation: hi },
  tlh: { translation: tlh },
  eo: { translation: eo },
  fi: { translation: fi },
  ko: { translation: ko },
  ja: { translation: ja },
  ru: { translation: ru },
  pl: { translation: pl },
  pt: { translation: pt },
  sv: { translation: sv },
  no: { translation: no },
  de: { translation: de },
  sjn: { translation: sjn },
  dth: { translation: dth },
  qvy: { translation: qvy },
  nav: { translation: nav },
  atl: { translation: atl }
};

i18n
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
    }
  });

export default i18n;
