import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Heart, Activity, Droplets, Smile, Moon, CheckCircle, Flame } from 'lucide-react';

export const RecoveryDashboard: React.FC = () => {
  const [painLevel, setPainLevel] = useState<number>(3);
  const [waterMl, setWaterMl] = useState<number>(1800);
  const [sleepHrs, setSleepHrs] = useState<number>(7.5);
  const [exercisesDone, setExercisesDone] = useState<boolean>(true);
  const [saved, setSaved] = useState(false);

  const handleLogProgress = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Post-Op Patient Recovery & Health Tracker
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Day 12 Post-Procedure • Cardiac Rehab Plan • Dr. Sarah Jenkins
          </p>
        </div>
        <Badge variant="success">Recovery On Track</Badge>
      </div>

      {saved && (
        <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-xs font-bold text-emerald-500 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Daily recovery log saved and synced to your attending doctor!
        </div>
      )}

      {/* Pain Scale Selector & Recovery Milestones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pain Scale Visual Input */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Flame className="h-5 w-5 text-rose-500" /> VAS Pain Level Scale (1 - 10)
          </h3>
          <p className="text-xs text-slate-500 mb-6">Select your current pain level for today's recovery score</p>

          <div className="grid grid-cols-10 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                onClick={() => setPainLevel(num)}
                className={`py-3 rounded-xl font-extrabold text-xs transition-all ${
                  painLevel === num
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="flex justify-between text-xs font-semibold text-slate-500">
            <span>1 = No Discomfort</span>
            <span className="text-rose-500 font-bold">Selected: {painLevel} / 10 ({painLevel <= 3 ? 'Mild' : painLevel <= 6 ? 'Moderate' : 'Severe'})</span>
            <span>10 = Severe Pain</span>
          </div>
        </div>

        {/* Daily Hydration & Sleep Trackers */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <Droplets className="h-5 w-5 text-sky-500" /> Daily Hydration & Sleep Logs
          </h3>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Water Intake: {waterMl} mL / 2500 mL goal</span>
              <span>{Math.round((waterMl / 2500) * 100)}%</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-3 rounded-full bg-sky-500 transition-all" style={{ width: `${(waterMl / 2500) * 100}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              <span>Sleep Duration: {sleepHrs} Hours</span>
              <span className="text-emerald-500 font-semibold">Optimal Rest</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
              <div className="h-3 rounded-full bg-indigo-500 transition-all" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Exercise Checklist & Save */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={exercisesDone}
            onChange={(e) => setExercisesDone(e.target.checked)}
            className="h-5 w-5 rounded border-slate-300 text-sky-500 focus:ring-sky-500"
          />
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Completed Doctor Prescribed 15-min Gentle Walking Rehab</h4>
            <p className="text-xs text-slate-500">Prescribed by Dr. Sarah Jenkins for cardiac muscle recovery</p>
          </div>
        </div>

        <button
          onClick={handleLogProgress}
          className="rounded-xl bg-sky-500 px-6 py-3 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
        >
          Save Daily Recovery Log
        </button>
      </div>
    </div>
  );
};
