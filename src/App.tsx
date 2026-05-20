import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { 
  Settings2, 
  Network, 
  Box, 
  ShieldCheck, 
  GlobeLock, 
  Key, 
  Package, 
  Search, 
  Code,
  Zap
} from 'lucide-react'
import { CONFIG } from './config'
import LanguageSelector from './components/LanguageSelector'
import GDPRModal from './components/GDPRModal'
import FeatureCard from './components/FeatureCard'

const ZFSLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M25,30 L75,30 L25,70 L75,70" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="50" r="6" />
    <circle cx="35" cy="40" r="3" />
    <circle cx="65" cy="40" r="3" />
    <circle cx="35" cy="60" r="3" />
    <circle cx="65" cy="60" r="3" />
  </svg>
);

const App = () => {
  const { t } = useTranslation()
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme')
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
    return false
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded-lg focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-50 transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="relative flex h-16 items-center justify-between rounded-2xl border border-white/5 bg-slate-900/90 backdrop-blur-md px-6 shadow-2xl z-[60]">
            <div className="flex flex-shrink-0 items-center">
              <picture className="h-10 w-auto mr-3">
                <source srcSet="/logo-head-only.avif" type="image/avif" />
                <img src="/logo-head-only.png" alt="Logo" className="h-full w-auto" />
              </picture>
              <span className="text-2xl font-bold tracking-tight text-white drop-shadow-md">
                Cloud<span className="text-cyan-400">BSD</span>
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8 overflow-visible">
            <a
              href="#about"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-sm"
            >
              {t('nav.about')}
            </a>
            <a
              href="#features"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-sm"
            >
              {t('nav.features')}
            </a>
            <a
              href="#community"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-sm"
            >
              {t('nav.community')}
            </a>
            <a
              href="#downloads"
              className="text-white/80 hover:text-white transition-colors text-sm font-medium drop-shadow-sm"
            >
              {t('nav.downloads')}
            </a>
            <div className="pl-4 border-l border-white/10 flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <LanguageSelector />
            </div>
          </nav>
            <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              onKeyDown={(e) => {
                if (e.key === 'Escape' && isMobileMenuOpen) {
                  setIsMobileMenuOpen(false);
                }
              }}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              )}
            </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden relative overflow-visible transition-all duration-300 ease-in-out bg-slate-900 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ maxHeight: isMobileMenuOpen ? '300px' : '0' }}
        >
          <nav id="mobile-menu" className="flex flex-col p-4 space-y-4 z-10 relative">
            <a
              href="#about"
              className="text-white/80 hover:text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
            <a
              href="#features"
              className="text-white/80 hover:text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.features')}
            </a>
            <a
              href="#community"
              className="text-white/80 hover:text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.community')}
            </a>
            <a
              href="#downloads"
              className="text-white/80 hover:text-white font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.downloads')}
            </a>
          </nav>
        </div>
        <br />
      </header>

      {/* Hero */}
      <main id="main-content" className="flex-1">
        <section className="hero-bg py-24 md:py-40 text-white overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <picture className="w-32 h-32 md:w-48 md:h-48 mx-auto drop-shadow-2xl">
                <source srcSet="/logo-head-only.avif" type="image/avif" />
                <img
                  src="/logo-head-only.png"
                  alt="CloudBSD Logo"
                  className="w-full h-full object-contain"
                />
              </picture>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tight"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl max-w-3xl mx-auto mb-12 text-blue-50/90 leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <a
                href="#about"
                className="bg-white text-cloudbsd-blue px-10 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('hero.learnMore')}
              </a>
              <a
                href="#downloads"
                className="bg-cloudbsd-red text-white px-10 py-4 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('hero.getStarted')}
              </a>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
                {t('about.title', { projectName: CONFIG.projectName })}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t('about.p1')}
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('about.p2')}
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section
          id="features"
          className="py-24 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 dark:text-white">
                {t('features.title')}
              </h2>
              <div className="w-24 h-1.5 bg-cloudbsd-blue mx-auto mb-16 rounded-full"></div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Settings2 className="w-8 h-8 text-slate-600 dark:text-slate-400" />}
                  title={t('features.unifiedController.title')}
                  description={t('features.unifiedController.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Network className="w-8 h-8 text-blue-500" />}
                  title={t('features.smartWorkerNodes.title')}
                  description={t('features.smartWorkerNodes.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Box className="w-8 h-8 text-indigo-500" />}
                  title={t('features.nativeVirtualization.title')}
                  description={t('features.nativeVirtualization.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
                  title={t('features.secureIsolation.title')}
                  description={t('features.secureIsolation.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Zap className="w-8 h-8 text-amber-500" />}
                  title={t('features.gpuManagement.title')}
                  description={t('features.gpuManagement.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<ZFSLogo className="w-8 h-8 text-blue-600 dark:text-blue-400" />}
                  title={t('features.zfsSecurity.title')}
                  description={t('features.zfsSecurity.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<GlobeLock className="w-8 h-8 text-cyan-500" />}
                  title={t('features.hardenedServices.title')}
                  description={t('features.hardenedServices.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Key className="w-8 h-8 text-orange-500" />}
                  title={t('features.rbac.title')}
                  description={t('features.rbac.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Package className="w-8 h-8 text-rose-500" />}
                  title={t('features.ociSupport.title')}
                  description={t('features.ociSupport.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Search className="w-8 h-8 text-violet-500" />}
                  title={t('features.discovery.title')}
                  description={t('features.discovery.desc')}
                />
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                <FeatureCard
                  icon={<Code className="w-8 h-8 text-teal-500" />}
                  title={t('features.apiFirst.title')}
                  description={t('features.apiFirst.desc')}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Community Section */}
        <section
          id="community"
          className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300"
        >
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">
                {t('community.title')}
              </h2>
              <div className="w-24 h-1.5 bg-cloudbsd-blue mx-auto mb-16 rounded-full"></div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col p-10 bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-[#5865F2] rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 transform group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.863-.886.077.077 0 0 1-.008-.128c.125-.094.248-.192.366-.293a.077.077 0 0 1 .081-.01c3.923 1.793 8.18 1.793 12.061 0a.077.077 0 0 1 .081.01c.118.101.241.199.366.293a.077.077 0 0 1-.008.128 13.116 13.116 0 0 1-1.863.886.076.076 0 0 0-.041.106c.335.693.735 1.36 1.197 1.99a.078.078 0 0 0 .084-.028 19.83 19.83 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                    {t('community.connect')}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xs">
                    {t('community.desc')}
                  </p>
                </div>
                <div className="mt-auto pt-8">
                  <a
                    href={CONFIG.discordLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transform hover:-translate-y-1 active:scale-95"
                  >
                    {t('community.join')}
                  </a>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col p-10 bg-slate-50 dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col items-center flex-1">
                  <div className="w-20 h-20 bg-cloudbsd-blue rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20 transform group-hover:scale-110 transition-transform duration-300">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                    {t('community.devMeeting')}
                  </h3>
                  <div className="flex flex-col items-center">
                    <p
                      className="text-xl font-bold text-cloudbsd-blue dark:text-blue-400 mb-2"
                      suppressHydrationWarning
                    >
                      {(() => {
                        const userTz =
                          Intl.DateTimeFormat().resolvedOptions().timeZone;
                        const monday = new Date();
                        const dayDiff = (1 - monday.getDay() + 7) % 7 || 7;
                        monday.setUTCDate(monday.getUTCDate() + dayDiff);
                        monday.setUTCHours(22, 0, 0, 0);
                        return monday.toLocaleString(undefined, {
                          timeZone: userTz,
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          timeZoneName: 'short',
                        });
                      })()}
                    </p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm italic">
                      Weekly Developer Sync
                    </p>
                  </div>
                </div>
                <div className="mt-auto pt-8">
                  <a
                    href="https://discord.gg/BDS42KG2?event=1504928746476535861"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full px-8 py-4 bg-cloudbsd-blue hover:bg-blue-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transform hover:-translate-y-1 active:scale-95"
                  >
                    {t('community.viewEvent')}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Downloads Section */}
        <section
          id="downloads"
          className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300"
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">
              {t('downloads.title')}
            </h2>
            <div className="max-w-xl mx-auto p-12 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
              <h3 className="text-2xl font-semibold text-slate-400 dark:text-slate-500">
                {t('downloads.comingSoon')}
              </h3>
              <p className="mt-4 text-slate-500 dark:text-slate-400">
                {t('downloads.stayTuned')}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <picture className="h-8 w-auto">
                  <source srcSet="/logo-head-only.avif" type="image/avif" />
                  <img
                    src="/logo-head-only.png"
                    alt={CONFIG.projectName}
                    className="h-full w-auto brightness-0 invert"
                  />
                </picture>
                <span className="text-xl font-bold text-white tracking-wider">
                  {CONFIG.projectName}
                </span>
              </div>
              <p className="text-sm">
                © 2026 <a href={CONFIG.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">{CONFIG.companyName}</a>. All rights reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-slate-500">{t('footer.builtOn')}</p>
            </div>
          </div>
        </div>
      </footer>
      <GDPRModal />
    </div>
  );
}

export default App
