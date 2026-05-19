export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const languageMeta: Record<string, Omit<Language, 'code'>> = {
  en: { name: 'English', nativeName: 'English', flag: '🇺🇸' },
  ar: { name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  atl: { name: 'Atlantean', nativeName: 'Atlantean', flag: '🔱' },
  bg: { name: 'Bulgarian', nativeName: 'Български', flag: '🇧🇬' },
  ca: { name: 'Catalan', nativeName: 'Català', flag: '🇪🇸' },
  zh: { name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
  hr: { name: 'Croatian', nativeName: 'Hrvatski', flag: '🇭🇷' },
  cs: { name: 'Czech', nativeName: 'Čeština', flag: '🇨🇿' },
  dth: { name: 'Dothraki', nativeName: 'Dothraki', flag: '🐎' },
  sjn: { name: 'Elvish', nativeName: 'Edhellen', flag: '🧝' },
  eo: { name: 'Esperanto', nativeName: 'Esperanto', flag: '🌍' },
  fi: { name: 'Finnish', nativeName: 'Suomi', flag: '🇫🇮' },
  fr: { name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  de: { name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  el: { name: 'Greek', nativeName: 'Ελληνικά', flag: '🇬🇷' },
  he: { name: 'Hebrew', nativeName: 'עברית', flag: '🇮🇱' },
  qvy: { name: 'High Valyrian', nativeName: 'Valyrio Eglie', flag: '🐉' },
  hi: { name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  hu: { name: 'Hungarian', nativeName: 'Magyar', flag: '🇭🇺' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  it: { name: 'Italian', nativeName: 'Italiano', flag: '🇮🇹' },
  ja: { name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  sw: { name: 'Kiswahili', nativeName: 'Kiswahili', flag: '🇰🇪' },
  tlh: { name: 'Klingon', nativeName: 'tlhIngan Hol', flag: '🛸' },
  ko: { name: 'Korean', nativeName: '한국어', flag: '🇰🇷' },
  lv: { name: 'Latvian', nativeName: 'Latviešu', flag: '🇱🇻' },
  lt: { name: 'Lithuanian', nativeName: 'Lietuvių', flag: '🇱🇹' },
  nav: { name: "Na'vi", nativeName: "Lì'fya leNa'vi", flag: '🌿' },
  no: { name: 'Norwegian', nativeName: 'Norsk', flag: '🇳🇴' },
  pl: { name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  'pt-BR': { name: 'Portuguese (Brazil)', nativeName: 'Português (Brasil)', flag: '🇧🇷' },
  'pt-PT': { name: 'Portuguese (Portugal)', nativeName: 'Português (Portugal)', flag: '🇵🇹' },
  pa: { name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ro: { name: 'Romanian', nativeName: 'Română', flag: '🇷🇴' },
  ru: { name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  sr: { name: 'Serbian', nativeName: 'Сrpски', flag: '🇷🇸' },
  sk: { name: 'Slovak', nativeName: 'Slovenčina', flag: '🇸🇰' },
  sl: { name: 'Slovenian', nativeName: 'Slovenščina', flag: '🇸🇮' },
  es: { name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  sv: { name: 'Swedish', nativeName: 'Svenska', flag: '🇸🇪' },
  tr: { name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷' },
  uk: { name: 'Ukrainian', nativeName: 'Українська', flag: '🇺🇦' },
  ur: { name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰' },
  yo: { name: 'Yorùbá', nativeName: 'Yorùbá', flag: '🇳🇬' },
};

const localeFiles = import.meta.glob('../locales/*.json', { eager: true }) as Record<string, { default: unknown }>;
const availableLocales = Object.keys(localeFiles).map(path => {
  const match = path.match(/\/locales\/(.+)\.json$/);
  return match ? match[1] : null;
}).filter((code): code is string => code !== null);

export const languages: Language[] = availableLocales
  .map(code => ({
    code,
    ...(languageMeta[code] || { name: code, nativeName: code, flag: '🌐' })
  }))
  .sort((a, b) => {
    if (a.code === 'en') return -1;
    if (b.code === 'en') return 1;
    return a.name.localeCompare(b.name);
  });

export const getLanguageByCode = (code: string | undefined | null): Language | undefined => {
  if (!code) return languages[0];
  return languages.find(lang => lang.code === code || lang.code.startsWith(code.split('-')[0]));
};

export default languages;