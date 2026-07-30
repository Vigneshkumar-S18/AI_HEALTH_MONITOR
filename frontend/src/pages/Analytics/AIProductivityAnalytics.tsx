import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Clock, Activity, Users, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const docTimeData = [
  { doctor: 'Dr. Jenkins', beforeMinutes: 18, withACIMinutes: 4 },
  { doctor: 'Dr. Vance', beforeMinutes: 22, withACIMinutes: 5 },
  { doctor: 'Dr. Green', beforeMinutes: 16, withACIMinutes: 3.5 },
];

export const AIProductivityAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Clinical Productivity & Documentation Analytics
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Doctor documentation time saved, consultation efficiency, and clinical decision outcome metrics
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Avg Doc Time / Patient" value="4.2 mins" subtitle="Reduced from 18 mins" icon={Clock} colorClass="from-emerald-500 to-teal-600" />
        <StatCard title="Total Hours Saved Today" value="18.4 hrs" subtitle="Across 6 Attending Physicians" icon={Activity} colorClass="from-purple-500 to-indigo-600" />
        <StatCard title="ACI SOAP Note Approval" value="96.8%" subtitle="High Clinical Precision" icon={CheckCircle} colorClass="from-sky-500 to-blue-600" />
      </div>
    </div>
  );
};
