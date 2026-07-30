import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Eye, Camera, CheckCircle } from 'lucide-react';

export const WoundHealingTracker: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Computer Vision Wound & Lesion Healing Tracker
          <Eye className="h-5 w-5 text-sky-500" />
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Assistive image segmentation, surface area estimation (cm²), and tissue healing timeline comparison
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <Badge variant="success">Healing Status: Improving (-22% Area)</Badge>
          <span className="text-xs font-bold text-slate-400">Current Area: 4.85 cm²</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-xs font-bold text-slate-400 mb-2">Day 1 Baseline Scan</p>
            <div className="h-32 rounded-xl bg-slate-200 dark:bg-slate-900 flex items-center justify-center text-xs font-mono text-slate-500">
              [Image: 6.20 cm² Surface Area]
            </div>
          </div>

          <div className="rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-4 text-center">
            <p className="text-xs font-bold text-sky-500 mb-2">Day 12 Today Scan</p>
            <div className="h-32 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-xs font-mono text-sky-400">
              [Image: 4.85 cm² • 85% Granulation]
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
