import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const GDPRModal = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (isVisible && dismissButtonRef.current) {
      dismissButtonRef.current.focus();
    }
  }, [isVisible]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleDismiss();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleDismiss = () => {
    localStorage.setItem('gdpr-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="gdpr-title"
    >
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-6 md:flex md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h3 id="gdpr-title" className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {t('gdpr.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {t('gdpr.message')}
            </p>
          </div>
          <div className="flex flex-shrink-0">
            <button
              ref={dismissButtonRef}
              onClick={handleDismiss}
              className="w-full md:w-auto px-6 py-2.5 bg-cloudbsd-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cloudbsd-blue"
            >
              {t('gdpr.dismiss')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRModal;