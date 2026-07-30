import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { Heart, Calendar, Pill, FileText, Download, UserCheck, ShieldCheck } from 'lucide-react';

export const PatientPortal: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patient Personal Health Portal
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Arthur Pendelton • MRN-2026-0001 • Blood Group O+
          </p>
        </div>
        <Badge variant="success">Verified Patient Record</Badge>
      </div>

      {/* Patient Health Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Blood Pressure"
          value="120/80"
          subtitle="Recorded Today"
          icon={Heart}
          trend="neutral"
          colorClass="from-rose-500 to-pink-600"
        />
        <StatCard
          title="Heart Rate"
          value="72 bpm"
          subtitle="Normal Resting HR"
          icon={Heart}
          trend="up"
          colorClass="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Active Prescriptions"
          value="2 Rx"
          subtitle="Amoxicillin & Atorvastatin"
          icon={Pill}
          colorClass="from-purple-500 to-indigo-600"
        />
        <StatCard
          title="Upcoming Appointment"
          value="Aug 05"
          subtitle="Dr. Sarah Jenkins"
          icon={Calendar}
          colorClass="from-sky-500 to-blue-600"
        />
      </div>

      {/* Health Details Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Prescriptions Card */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Pill className="h-5 w-5 text-sky-500" />
            My Active Medications
          </h3>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Amoxicillin 500mg</h4>
                <p className="text-xs text-slate-500">Frequency: 1-0-1 (Morning & Evening after meals) • 5 Days</p>
              </div>
              <Badge variant="info">Active</Badge>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Atorvastatin 20mg</h4>
                <p className="text-xs text-slate-500">Frequency: 0-0-1 (At bedtime) • 30 Days</p>
              </div>
              <Badge variant="info">Active</Badge>
            </div>
          </div>
        </div>

        {/* Diagnostic Reports Download */}
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-500" />
            Diagnostic Reports & EMR Downloads
          </h3>

          <div className="space-y-3">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Complete Blood Count (CBC)</h4>
                <p className="text-xs text-slate-500">Pathology Lab • July 2026</p>
              </div>
              <button className="flex items-center gap-1.5 rounded-xl bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-600 dark:text-sky-400 hover:bg-sky-500/20 transition-colors">
                <Download className="h-3.5 w-3.5" /> PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
