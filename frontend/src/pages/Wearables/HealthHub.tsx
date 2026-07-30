import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { Activity, Flame, Moon, Heart, RefreshCw } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const stepsData = [
  { day: 'Mon', steps: 6400 },
  { day: 'Tue', steps: 8200 },
  { day: 'Wed', steps: 7100 },
  { day: 'Thu', steps: 9500 },
  { day: 'Fri', steps: 10200 },
  { day: 'Sat', steps: 8900 },
  { day: 'Sun', steps: 7800 },
];

export const HealthHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Wearable Health & Biometrics Integration Hub
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Real-time biometric data sync from Apple Health, Google Fit & Fitbit
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20">
          <RefreshCw className="h-4 w-4" /> Sync Wearables
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Daily Steps" value="9,500" subtitle="Goal: 10,000" icon={Activity} colorClass="from-emerald-500 to-teal-600" />
        <StatCard title="Resting Heart Rate" value="68 bpm" subtitle="Apple Watch Series 9" icon={Heart} colorClass="from-rose-500 to-pink-600" />
        <StatCard title="Sleep Duration" value="7.8 hrs" subtitle="Deep Sleep: 2.2 hrs" icon={Moon} colorClass="from-indigo-500 to-purple-600" />
        <StatCard title="Active Calories" value="540 kcal" subtitle="Fitbit Charge 6" icon={Flame} colorClass="from-amber-500 to-orange-600" />
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Weekly Activity Step Count</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stepsData}>
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
              <Bar dataKey="steps" fill="#0284c7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
