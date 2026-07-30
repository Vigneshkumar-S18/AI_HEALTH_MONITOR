import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Badge } from '../../components/ui/Badge';
import { Bed, Activity, Clock, ShieldAlert, Users, DollarSign, Stethoscope, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const patientFlowData = [
  { time: '08:00', walkIn: 12, emergency: 3 },
  { time: '10:00', walkIn: 28, emergency: 5 },
  { time: '12:00', walkIn: 34, emergency: 4 },
  { time: '14:00', walkIn: 22, emergency: 6 },
  { time: '16:00', walkIn: 18, emergency: 2 },
];

export const HospitalCommandCenter: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Real-Time Hospital Command Center
            <Activity className="h-5 w-5 text-rose-500 animate-pulse" />
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Executive operations telemetry, OT utilization, bed heatmaps, and emergency flow monitoring
          </p>
        </div>
        <Badge variant="success">All Systems Operational</Badge>
      </div>

      {/* Real-time KPI Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="ICU Bed Occupancy" value="80%" subtitle="8 / 10 Beds Occupied" icon={Bed} colorClass="from-rose-500 to-red-600" />
        <StatCard title="Operating Theatre (OT)" value="87.5%" subtitle="3 Active Surgeries" icon={Stethoscope} colorClass="from-purple-500 to-indigo-600" />
        <StatCard title="Emergency Queue" value="4 Waiting" subtitle="Avg Wait: 12 mins" icon={Clock} colorClass="from-amber-500 to-orange-600" />
        <StatCard title="Documentation Time Saved" value="18.4 hrs" subtitle="ACI Scribe Enabled" icon={Activity} colorClass="from-sky-500 to-blue-600" />
      </div>

      {/* Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Flow Chart */}
        <div className="lg:col-span-2 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Patient Flow & Hourly Admissions</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={patientFlowData}>
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="walkIn" stroke="#0284c7" fill="#0284c7" fillOpacity={0.3} />
                <Area type="monotone" dataKey="emergency" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Operating Theatre Live Status */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Live OT Room Matrix</h3>

          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-slate-900 dark:text-white">OT Room 1 (Cardiac Surgery)</span>
              <Badge variant="error">In Surgery</Badge>
            </div>
            <p className="text-xs text-slate-500">Coronary Artery Bypass Graft (CABG)</p>
            <p className="text-[11px] text-slate-400 mt-2 font-mono">Lead Surgeon: Dr. Sarah Jenkins</p>
          </div>

          <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-sm text-slate-900 dark:text-white">OT Room 2 (General Surgery)</span>
              <Badge variant="success">Available</Badge>
            </div>
            <p className="text-xs text-slate-500">Sanitized & Sterilized</p>
          </div>
        </div>
      </div>
    </div>
  );
};
