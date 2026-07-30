import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Users, DollarSign, Bed, Calendar, Activity, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 42000 },
  { month: 'Feb', revenue: 48000 },
  { month: 'Mar', revenue: 55000 },
  { month: 'Apr', revenue: 62000 },
  { month: 'May', revenue: 58000 },
  { month: 'Jun', revenue: 71000 },
  { month: 'Jul', revenue: 84000 },
];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Executive Hospital Overview
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Real-time hospital operations, financial revenue metrics, bed capacity, and audit logs
        </p>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value="1,420"
          icon={Users}
          change="+12.5%"
          colorClass="from-sky-500 to-blue-600"
        />
        <StatCard
          title="Monthly Revenue"
          value="$84,250"
          icon={DollarSign}
          change="+18.2%"
          colorClass="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Bed Occupancy"
          value="82%"
          subtitle="41 / 50 Beds Occupied"
          icon={Bed}
          change="+4%"
          colorClass="from-amber-500 to-orange-600"
        />
        <StatCard
          title="Appointments Today"
          value="64"
          icon={Calendar}
          change="+8%"
          colorClass="from-purple-500 to-indigo-600"
        />
      </div>

      {/* Main Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Analytics Chart */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Growth Trend</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Hospital billing earnings across recent months</p>
            </div>
            <Badge variant="success">+18.2% YoY</Badge>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Departmental Status */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Departmental Workload</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Cardiology</span>
                  <span>88% Load</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-sky-500" style={{ width: '88%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Neurology</span>
                  <span>65% Load</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-emerald-500" style={{ width: '65%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>Orthopedics</span>
                  <span>45% Load</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-amber-500" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
              Manage Staff Allocation
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Audit Logs & Security Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Security & Audit Logs</h3>
          </div>
          <Badge variant="info">OWASP Compliant</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="pb-3">Timestamp</th>
                <th className="pb-3">User</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Module</th>
                <th className="pb-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 font-mono">10:42 AM</td>
                <td>Eleanor Vane (Admin)</td>
                <td><Badge variant="info">SYSTEM_BOOTSTRAP</Badge></td>
                <td>System</td>
                <td className="font-mono">127.0.0.1</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">10:28 AM</td>
                <td>Dr. Sarah Jenkins</td>
                <td><Badge variant="success">DIAGNOSIS_LOGGED</Badge></td>
                <td>EMR</td>
                <td className="font-mono">192.168.1.42</td>
              </tr>
              <tr>
                <td className="py-3 font-mono">09:15 AM</td>
                <td>Marcus Wright (Reception)</td>
                <td><Badge variant="warning">PATIENT_ADMITTED</Badge></td>
                <td>Admissions</td>
                <td className="font-mono">192.168.1.15</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
