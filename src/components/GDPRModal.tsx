import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const GDPRModal: React.FC = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('gdpr-consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl rounded-2xl p-6 md:flex md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-8">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {t('gdpr.title')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {t('gdpr.message')}
            </p>
          </div>
          <div className="flex flex-shrink-0">
            <button
              onClick={handleDismiss}
              className="w-full md:w-auto px-6 py-2.5 bg-cloudbsd-blue hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200"
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
