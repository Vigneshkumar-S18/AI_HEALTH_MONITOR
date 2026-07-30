import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Building2, ShieldCheck, Lock, Bell, Server } from 'lucide-react';

export const HospitalSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Hospital Configuration & Governance
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Tenant organization profile, RBAC security roles, and system event integrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-sky-500" /> Hospital Identity
          </h3>
          <div className="space-y-3 text-xs">
            <div>
              <p className="text-slate-400 font-semibold">Hospital Name</p>
              <p className="font-bold text-slate-900 dark:text-white">City Care General Hospital</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Tenant Identifier Code</p>
              <p className="font-bold font-mono text-sky-500">HOSP-001</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">License Registration Number</p>
              <p className="font-bold text-slate-900 dark:text-white">LIC-NY-992014</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-purple-500" /> Clinical AI Plugin Integration
          </h3>
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Event-Driven Webhooks API Hooks: Enabled
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Ambient Clinical Intelligence Listener: Ready
            </p>
            <p className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span> Medical Speech Recognition Gateway: Ready
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
              Note: Active AI models belong to Phase 3. Phase 1 backend architecture is designed with decoupled event hooks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
