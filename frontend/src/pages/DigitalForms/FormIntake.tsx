import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { FileCheck, PenTool, CheckCircle } from 'lucide-react';

export const FormIntake: React.FC = () => {
  const [signed, setSigned] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Digital Patient Intake & Surgery Consent
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Electronic medical forms and digital signature submission
        </p>
      </div>

      {signed && (
        <div className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-xs font-bold text-emerald-500 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" /> Consent form digitally signed and archived into your EMR record!
        </div>
      )}

      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">Pre-Procedure Informed Consent Form</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          I, Arthur Pendelton, hereby acknowledge that I have been informed of the clinical risks, procedure benefits, and alternatives regarding my upcoming Cardiac Procedure. I confirm that I have disclosed all known allergies and current medication schedules.
        </p>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">Digital Signature Simulator</label>
          <div className="h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-400 font-mono italic text-sm">
            {signed ? 'Arthur Pendelton (Digitally Signed - 2026-07-30)' : 'Click Sign Consent Form Below'}
          </div>
        </div>

        <button
          onClick={() => setSigned(true)}
          className="w-full rounded-xl bg-sky-500 py-3 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
        >
          Sign & Submit Consent Form
        </button>
      </div>
    </div>
  );
};
