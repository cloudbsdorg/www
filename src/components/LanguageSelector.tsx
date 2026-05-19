import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { languages, getLanguageByCode } from '../config/languages';
import { changeLanguage } from '../i18n';
import { Globe, X, Check } from 'lucide-react';

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
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center h-10 px-3 md:px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm hover:border-cloudbsd-blue dark:hover:border-blue-500 transition-all duration-300 group"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 md:mr-2 text-slate-500 group-hover:text-cloudbsd-blue transition-colors" />
        <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-200 mr-2">
          {currentLanguage.nativeName}
        </span>
        <span className="md:hidden text-lg" aria-hidden="true">{currentLanguage.flag}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="hidden md:block absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto rounded-2xl shadow-2xl bg-white dark:bg-slate-800 ring-1 ring-black ring-opacity-5 z-[100] focus:outline-none scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700 p-2"
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
            </motion.div>

            {/* Mobile Full-Screen Modal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[200] bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="w-6 h-6 text-cloudbsd-blue" />
                  Select Language
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center px-5 py-4 text-lg w-full rounded-2xl border transition-all ${
                      (i18n.language || '').startsWith(lang.code)
                        ? 'bg-blue-50 dark:bg-blue-900/30 border-cloudbsd-blue/30 text-cloudbsd-blue dark:text-blue-400 font-bold'
                        : 'border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="mr-4 text-2xl">{lang.flag}</span>
                    <span className="flex-1 text-left">{lang.nativeName}</span>
                    {(i18n.language || '').startsWith(lang.code) && <Check className="w-6 h-6" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;