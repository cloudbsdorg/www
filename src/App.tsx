import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CONFIG } from './config'
import LanguageSelector from './components/LanguageSelector'
import GDPRModal from './components/GDPRModal'

const App: React.FC = () => {
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
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between relative">
          <div className="flex items-center space-x-2">
            <img src="/logo-head-only.png" alt="Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-cloudbsd-blue dark:text-blue-400">{CONFIG.projectName}</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">{t('nav.about')}</a>
            <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">{t('nav.features')}</a>
            <a href="#community" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">{t('nav.community')}</a>
            <a href="#downloads" className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium transition-colors">{t('nav.downloads')}</a>
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              )}
            </button>
            <LanguageSelector />
          </nav>
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ maxHeight: isMobileMenuOpen ? '300px' : '0' }}
        >
          <nav className="flex flex-col p-4 space-y-4">
            <a 
              href="#about" 
              className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </a>
            <a 
              href="#features" 
              className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.features')}
            </a>
            <a 
              href="#community" 
              className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.community')}
            </a>
            <a 
              href="#downloads" 
              className="text-slate-600 dark:text-slate-300 hover:text-cloudbsd-blue dark:hover:text-blue-400 font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {t('nav.downloads')}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-bg py-20 md:py-32 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 text-blue-50">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#about" className="bg-white text-cloudbsd-blue px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors">{t('hero.learnMore')}</a>
            <a href="#downloads" className="bg-cloudbsd-red text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition-colors">{t('hero.getStarted')}</a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">{t('about.title', { projectName: CONFIG.projectName })}</h2>
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
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800/30 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">{t('features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              title={t('features.unifiedController.title')}
              description={t('features.unifiedController.desc')}
            />
            <FeatureCard 
              title={t('features.smartWorkerNodes.title')}
              description={t('features.smartWorkerNodes.desc')}
            />
            <FeatureCard 
              title={t('features.nativeVirtualization.title')}
              description={t('features.nativeVirtualization.desc')}
            />
            <FeatureCard 
              title={t('features.secureIsolation.title')}
              description={t('features.secureIsolation.desc')}
            />
            <FeatureCard 
              title={t('features.gpuManagement.title')}
              description={t('features.gpuManagement.desc')}
            />
            <FeatureCard 
              title={t('features.zfsSecurity.title')}
              description={t('features.zfsSecurity.desc')}
            />
            <FeatureCard 
              title={t('features.hardenedServices.title')}
              description={t('features.hardenedServices.desc')}
            />
            <FeatureCard 
              title={t('features.rbac.title')}
              description={t('features.rbac.desc')}
            />
            <FeatureCard 
              title={t('features.ociSupport.title')}
              description={t('features.ociSupport.desc')}
            />
            <FeatureCard 
              title={t('features.discovery.title')}
              description={t('features.discovery.desc')}
            />
            <FeatureCard 
              title={t('features.apiFirst.title')}
              description={t('features.apiFirst.desc')}
            />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">{t('community.title')}</h2>
          <div className="max-w-2xl mx-auto p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#5865F2] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.862-1.297 1.197-1.99a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.863-.886.077.077 0 0 1-.008-.128c.125-.094.248-.192.366-.293a.077.077 0 0 1 .081-.01c3.923 1.793 8.18 1.793 12.061 0a.077.077 0 0 1 .081.01c.118.101.241.199.366.293a.077.077 0 0 1-.008.128 13.116 13.116 0 0 1-1.863.886.076.076 0 0 0-.041.106c.335.693.735 1.36 1.197 1.99a.078.078 0 0 0 .084.028 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.06.06 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.947 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z"/>
                </svg>
              </div>
              <p className="text-xl font-medium text-slate-700 dark:text-slate-200 mb-2">{t('community.connect')}</p>
              <p className="text-slate-600 dark:text-slate-400 mb-8">{t('community.desc')}</p>
              <a 
                href={CONFIG.discordLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transform hover:-translate-y-0.5"
              >
                {t('community.join')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section id="downloads" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 dark:text-white">{t('downloads.title')}</h2>
          <div className="max-w-xl mx-auto p-12 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
            <h3 className="text-2xl font-semibold text-slate-400 dark:text-slate-500">{t('downloads.comingSoon')}</h3>
            <p className="mt-4 text-slate-500 dark:text-slate-400">{t('downloads.stayTuned')}</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold text-white tracking-wider">{CONFIG.projectName}</span>
              <p className="mt-2 text-sm">{t('footer.rights', { companyName: CONFIG.companyName })}</p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm">{t('footer.projectBy')} <a href={`mailto:${CONFIG.ownerEmail}`} className="text-white hover:underline">{CONFIG.ownerName}</a></p>
              <p className="mt-2 text-xs text-slate-500">{t('footer.builtOn')}</p>
            </div>
          </div>
        </div>
      </footer>
      <GDPRModal />
    </div>
  )
}

const FeatureCard: React.FC<{title: string, description: string}> = ({ title, description }) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700">
    <h3 className="text-xl font-bold mb-3 text-cloudbsd-blue dark:text-blue-400">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
  </div>
)

export default App
