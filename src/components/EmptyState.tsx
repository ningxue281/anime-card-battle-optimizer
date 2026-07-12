import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export default function EmptyState({
  icon = <AlertCircle size={48} />,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full py-12 px-4">
      <div className="text-dark-500 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-dark-50 mb-2">{title}</h3>
      <p className="text-dark-400 text-center mb-6 max-w-md">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}
