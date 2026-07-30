import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Heart, Users, ShieldAlert, Pill, Calendar, FileText } from 'lucide-react';

export const CaregiverPortal: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Family Caregiver & Multi-Patient Portal
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Caregiver Proxy Account • Martha Pendelton (Spouse & Primary Representative)
          </p>
        </div>
        <Badge variant="info">Full Proxy Access Granted</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Linked Family Members</h3>
          <div className="rounded-2xl border border-sky-500/30 bg-sky-500/5 p-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">Arthur Pendelton (Spouse)</h4>
              <p className="text-xs text-slate-500 font-mono">MRN-2026-0001 • Cardiology Care Plan</p>
              <div className="mt-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
                Next Appointment: Aug 05 (Dr. Sarah Jenkins)
              </div>
            </div>
            <Badge variant="success">Active Plan</Badge>
          </div>
        </div>

        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-rose-500" /> Caregiver Emergency Alerts
          </h3>
          <div className="rounded-2xl bg-rose-500/10 border border-rose-500/30 p-4 text-xs font-semibold text-rose-300">
            No critical emergency alerts logged in past 24 hours. Automated SMS notifications configured for +1 (555) 777-9999.
          </div>
        </div>
      </div>
    </div>
  );
};
