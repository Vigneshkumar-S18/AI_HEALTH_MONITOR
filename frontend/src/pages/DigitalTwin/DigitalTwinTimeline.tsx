import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Activity, Calendar, Stethoscope, Pill, TestTube, FileText, Heart } from 'lucide-react';

export const DigitalTwinTimeline: React.FC = () => {
  const timelineEvents = [
    { date: 'July 30, 2026', time: '10:30 AM', title: 'Cardiology Consultation (SOAP Note Logged)', desc: 'Diagnosis: Angina Pectoris (I20.9). Prescribed Atorvastatin 20mg.', type: 'CONSULTATION', icon: Stethoscope },
    { date: 'July 30, 2026', time: '09:15 AM', title: 'Clinical Vitals Recorded', desc: 'BP: 120/80 mmHg, HR: 72 bpm, SpO2: 98%.', type: 'VITALS', icon: Heart },
    { date: 'July 28, 2026', time: '02:00 PM', title: 'Complete Blood Count (CBC) Laboratory Report', desc: 'WBC: 6.8 x10^3/µL, Hb: 14.2 g/dL (Normal).', type: 'LAB', icon: TestTube },
    { date: 'June 14, 2026', time: '11:00 AM', title: 'Cardiac Bypass Surgery (Post-Op Clearance)', desc: 'Discharged on Day 5 with post-op rehabilitation plan.', type: 'SURGERY', icon: Activity },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Longitudinal Patient Digital Twin Timeline
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Arthur Pendelton • MRN-2026-0001 • 360-Degree Clinical History Engine
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 shadow-xl">
        <div className="relative border-l-2 border-sky-500/30 ml-4 space-y-8 pl-6">
          {timelineEvents.map((evt, idx) => {
            const Icon = evt.icon;
            return (
              <div key={idx} className="relative">
                <span className="absolute -left-[35px] top-0 flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500 text-white shadow-md shadow-sky-500/20">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-1 bg-slate-50 dark:bg-slate-950/60">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-sm text-slate-900 dark:text-white">{evt.title}</span>
                    <Badge variant="info">{evt.date}</Badge>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300">{evt.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
