import { memo, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { isFirefox } from '../utils/browser';
import { languages, getLanguageByCode } from '../config/languages';
import { changeLanguage } from '../i18n';
import { X, Globe, Check, Sun, Moon } from 'lucide-react';

const LanguageSelector = memo(() => {
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
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center h-10 px-4 rounded-xl border border-white/10 bg-white/5 shadow-sm hover:border-white/30 transition-all duration-300 group"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4 mr-2 text-white/60 group-hover:text-white transition-colors" />
        <span className="text-sm font-medium text-white/80 group-hover:text-white">
          {currentLanguage?.nativeName || 'Language'}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 max-h-96 overflow-y-auto rounded-2xl shadow-2xl bg-slate-800 border border-white/10 z-[9999] p-2"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`flex items-center px-4 py-3 text-sm w-full rounded-xl transition-all duration-200 ${
                  (i18n.language || '').startsWith(lang.code)
                    ? 'bg-slate-700/50 text-cyan-400 font-bold'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{lang.flag}</span>
                <span className="flex-1 text-left">{lang.nativeName}</span>
                {(i18n.language || '').startsWith(lang.code) && <Check className="w-4 h-4" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

LanguageSelector.displayName = 'LanguageSelector';

const Navbar = memo(() => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const currentLanguage = getLanguageByCode(i18n.language) || languages[0];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const navLinks = [
    { href: '#about', label: t('nav.about') },
    { href: '#features', label: t('nav.features') },
    { href: '#community', label: t('nav.community') },
    { href: '#downloads', label: t('nav.downloads') },
  ];

  const handleLanguageChange = (lng: string) => {
    changeLanguage(lng);
    const url = new URL(window.location.href);
    url.searchParams.set('lng', lng);
    window.history.pushState({}, '', url.toString());
    setMobileLangOpen(false);
    setMobileMenuOpen(false);
  };

  const closeMenu = () => {
    setMobileLangOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="relative flex h-16 items-center justify-between rounded-2xl border border-white/5 bg-slate-900/90 backdrop-blur-md px-6 shadow-2xl">
            <div className="flex flex-shrink-0 items-center">
              <picture className="h-10 w-auto mr-3">
                {!isFirefox() && <source srcSet="/logo-head-only.avif" type="image/avif" />}
                <img src="/logo-head-only.png" alt="Logo" className="h-full w-auto" />
              </picture>
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                Cloud<span className="text-cyan-400">BSD</span>
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-sm">
                    {link.label}
                  </a>
                ))}
                <div className="pl-4 border-l border-white/10 flex items-center gap-2">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? (
                      <Sun className="w-5 h-5" />
                    ) : (
                      <Moon className="w-5 h-5" />
                    )}
                  </button>
                  <LanguageSelector />
                </div>
              </div>
            </div>
            <div className="md:hidden flex items-center gap-4">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="text-white/80 hover:text-white drop-shadow-sm"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl md:hidden overflow-y-auto"
          >
            <div className="flex flex-col min-h-full p-6">
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-bold tracking-tight text-white">
                  Cloud<span className="text-cyan-400">BSD</span>
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 rounded-full bg-white/5 text-white/60 hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="text-2xl font-bold text-white/80 hover:text-white transition-colors py-2"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="border-t border-white/10 pt-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setMobileLangOpen(!mobileLangOpen)}
                    className="flex items-center gap-3 text-xl font-bold text-white/80 hover:text-white transition-colors py-2 w-full"
                  >
                    <Globe className="w-6 h-6" />
                    <span>{currentLanguage?.flag}</span>
                    <span>{currentLanguage?.nativeName}</span>
                  </button>
                  <AnimatePresence>
                    {mobileLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col space-y-2 pt-4 pl-9">
                          {languages.map((lang) => (
                            <button
                              key={lang.code}
                              onClick={() => handleLanguageChange(lang.code)}
                              className={`flex items-center gap-3 text-lg py-2 transition-colors text-left ${
                                (i18n.language || '').startsWith(lang.code)
                                  ? 'text-cyan-400 font-bold'
                                  : 'text-white/70 hover:text-white'
                              }`}
                            >
                              <span className="text-xl">{lang.flag}</span>
                              <span className="flex-1">{lang.nativeName}</span>
                              {(i18n.language || '').startsWith(lang.code) && <Check className="w-5 h-5" />}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className="border-t border-white/10 pt-4 mt-4">
                  <button
                    type="button"
                    onClick={toggleDarkMode}
                    className="flex items-center gap-3 text-xl font-bold text-white/80 hover:text-white transition-colors py-2 w-full"
                  >
                    {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                    <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar;
export { LanguageSelector };