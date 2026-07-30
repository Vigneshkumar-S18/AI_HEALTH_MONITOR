import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Stethoscope, CheckCircle, Clock } from 'lucide-react';

export const SmartORSuite: React.FC = () => {
  const whoChecklist = [
    { title: 'Sign In (Before Induction of Anesthesia)', status: 'COMPLETED' },
    { title: 'Time Out (Before Skin Incision)', status: 'COMPLETED' },
    { title: 'Sign Out (Before Patient Leaves Operating Room)', status: 'IN_PROGRESS' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Smart Operating Room (OR) & Surgical Checklist Suite
          <Stethoscope className="h-5 w-5 text-purple-500" />
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          WHO Surgical Safety Checklist automation, live surgery timeline, nurse coordination, and supply consumption
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">WHO Surgical Safety Checklist</h3>

        <div className="space-y-3">
          {whoChecklist.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</span>
              <Badge variant={item.status === 'COMPLETED' ? 'success' : 'warning'}>
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
