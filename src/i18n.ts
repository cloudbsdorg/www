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
import ptBR from './locales/pt-BR.json';
import ptPT from './locales/pt-PT.json';
import sv from './locales/sv.json';
import no from './locales/no.json';
import de from './locales/de.json';
import sjn from './locales/sjn.json';
import dth from './locales/dth.json';
import qvy from './locales/qvy.json';
import nav from './locales/nav.json';
import atl from './locales/atl.json';
import bg from './locales/bg.json';
import ca from './locales/ca.json';
import cs from './locales/cs.json';
import el from './locales/el.json';
import he from './locales/he.json';
import hr from './locales/hr.json';
import hu from './locales/hu.json';
import id from './locales/id.json';
import it from './locales/it.json';
import lt from './locales/lt.json';
import lv from './locales/lv.json';
import pa from './locales/pa.json';
import ro from './locales/ro.json';
import sk from './locales/sk.json';
import sl from './locales/sl.json';
import sr from './locales/sr.json';
import sw from './locales/sw.json';
import tr from './locales/tr.json';
import uk from './locales/uk.json';
import ur from './locales/ur.json';
import yo from './locales/yo.json';

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
  'pt-BR': { translation: ptBR },
  'pt-PT': { translation: ptPT },
  sv: { translation: sv },
  no: { translation: no },
  de: { translation: de },
  sjn: { translation: sjn },
  dth: { translation: dth },
  qvy: { translation: qvy },
  nav: { translation: nav },
  atl: { translation: atl },
  bg: { translation: bg },
  ca: { translation: ca },
  cs: { translation: cs },
  el: { translation: el },
  he: { translation: he },
  hr: { translation: hr },
  hu: { translation: hu },
  id: { translation: id },
  it: { translation: it },
  lt: { translation: lt },
  lv: { translation: lv },
  pa: { translation: pa },
  ro: { translation: ro },
  sk: { translation: sk },
  sl: { translation: sl },
  sr: { translation: sr },
  sw: { translation: sw },
  tr: { translation: tr },
  uk: { translation: uk },
  ur: { translation: ur },
  yo: { translation: yo }
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
