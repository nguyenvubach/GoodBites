import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface HealthScoreProps {
  score: number;
  className?: string;
}

export function HealthScore({ score, className }: HealthScoreProps) {
  const getScoreColor = () => {
    if (score >= 7) return 'bg-green-100 text-green-700';
    if (score >= 4) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getIcon = () => {
    if (score >= 7) return <CheckCircle className="h-5 w-5" />;
    if (score >= 4) return <AlertTriangle className="h-5 w-5" />;
    return <XCircle className="h-5 w-5" />;
  };

  return (
    <div className={cn("flex items-center gap-2 rounded-full px-4 py-2", getScoreColor(), className)}>
      {getIcon()}
      <span className="font-medium">Health Score: {score}/10</span>
    </div>
  );
}