import { motion } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <motion.div
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 dark:border-slate-700 h-full flex flex-col"
  >
    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6 text-cloudbsd-blue dark:text-blue-400">
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-cloudbsd-blue transition-colors">
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
      {description}
    </p>
  </motion.div>
);

export default FeatureCard;