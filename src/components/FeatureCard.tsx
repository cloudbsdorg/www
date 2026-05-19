interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-700">
    <h3 className="text-xl font-bold mb-3 text-cloudbsd-blue dark:text-blue-400">{title}</h3>
    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{description}</p>
  </div>
);

export default FeatureCard;