import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GDPRModal = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const consent = localStorage.getItem('gdpr-consent');
    if (!consent) {
      // Delay showing the modal for a smoother entrance
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('gdpr-consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-[200] md:max-w-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gdpr-title"
        >
          <div className="bg-slate-900/95 dark:bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-2xl p-5 shadow-blue-500/10">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-10 h-10 bg-cloudbsd-blue/20 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-cloudbsd-blue" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 id="gdpr-title" className="text-sm font-bold text-white">
                    {t('gdpr.title')}
                  </h3>
                  <button 
                    onClick={handleDismiss}
                    className="text-slate-500 hover:text-white transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  {t('gdpr.message')}
                </p>
                <button
                  ref={dismissButtonRef}
                  onClick={handleDismiss}
                  className="w-full py-2 bg-cloudbsd-blue hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20"
                >
                  {t('gdpr.dismiss')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GDPRModal;