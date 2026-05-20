import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 h-full flex flex-col group"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-cloudbsd-blue dark:text-blue-400 group-hover:bg-cloudbsd-blue group-hover:text-white transition-all duration-300 flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cloudbsd-blue transition-colors">
        {title}
      </h3>
    </div>
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
      {description}
    </p>
  </motion.div>
);

export default FeatureCard;