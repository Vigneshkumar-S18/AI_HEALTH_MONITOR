import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  subtitle?: string;
  colorClass?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  trend = 'up',
  subtitle,
  colorClass = 'from-sky-500 to-blue-600',
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClass} text-white shadow-md shadow-sky-500/20`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {change && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-medium">
          <span
            className={
              trend === 'up'
                ? 'text-emerald-500 dark:text-emerald-400'
                : trend === 'down'
                ? 'text-rose-500 dark:text-rose-400'
                : 'text-slate-400'
            }
          >
            {change}
          </span>
          <span className="text-slate-400 dark:text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
};
