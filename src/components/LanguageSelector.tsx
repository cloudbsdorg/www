import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { languages, getLanguageByCode } from '../config/languages';
import { changeLanguage } from '../i18n';
import { Globe, Check } from 'lucide-react';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = getLanguageByCode(i18n.language) || languages[0];

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    const url = new URL(window.location.href);
    url.searchParams.set('lng', lng);
    window.history.pushState({}, '', url.toString());
    setIsOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const lng = urlParams.get('lng');
      if (lng && i18n.language !== lng) {
        i18n.changeLanguage(lng);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <div className="relative inline-block z-[200]" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center h-10 px-3 md:px-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-sm hover:border-white/30 transition-all duration-300 group text-white"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 md:mr-2 text-white/80 group-hover:text-white transition-colors" />
        <span className="hidden md:inline text-sm font-medium text-white/90 mr-2">
          {currentLanguage.nativeName}
        </span>
        <span className="md:hidden text-lg" aria-hidden="true">{currentLanguage.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop Dropdown */}
            <div
              className="hidden md:block absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-[300] focus:outline-none scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 p-2"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center px-4 py-3 text-sm w-full rounded-xl transition-all duration-200 ${
                    (i18n.language || '').startsWith(lang.code)
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-cloudbsd-blue dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="mr-3 text-lg">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.nativeName}</span>
                  {(i18n.language || '').startsWith(lang.code) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>

            {/* Mobile Dropdown */}
            <div
              className="md:hidden absolute right-0 mt-2 w-64 rounded-2xl shadow-2xl bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-[300] p-2 max-h-64 overflow-y-auto"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`flex items-center px-4 py-3 text-sm w-full rounded-xl transition-all duration-200 ${
                    (i18n.language || '').startsWith(lang.code)
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-cloudbsd-blue dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="mr-3 text-lg">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.nativeName}</span>
                  {(i18n.language || '').startsWith(lang.code) && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;