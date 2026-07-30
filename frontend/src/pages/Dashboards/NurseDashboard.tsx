import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Heart, Activity, Thermometer, UserCheck, Plus, CheckCircle } from 'lucide-react';

export const NurseDashboard: React.FC = () => {
  const [isVitalsModalOpen, setIsVitalsModalOpen] = useState(false);
  const [systolic, setSystolic] = useState(120);
  const [diastolic, setDiastolic] = useState(80);
  const [hr, setHr] = useState(72);
  const [temp, setTemp] = useState(36.8);
  const [spO2, setSpO2] = useState(98);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleRecordVitals = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      setIsVitalsModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Nurse Station & Inpatient Ward Care
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Intensive Care Unit (ICU) Ward • Shift Duty Station 1
          </p>
        </div>
        <button
          onClick={() => setIsVitalsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20 transition-all"
        >
          <Activity className="h-4 w-4" />
          Record Patient Vitals
        </button>
      </div>

      {/* Ward Bed Status Quick Matrix */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">ICU Bed Allocation Overview</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/5 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">Bed ICU-101</span>
              <Badge variant="error">Occupied</Badge>
            </div>
            <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Arthur Pendelton</p>
            <p className="text-[11px] text-slate-500 font-mono">MRN-2026-0001</p>
            <div className="mt-3 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              BP: 120/80 • HR: 72 bpm • SpO2: 98%
            </div>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">Bed ICU-102</span>
              <Badge variant="success">Available</Badge>
            </div>
            <p className="text-xs font-medium text-slate-500">Sanitized & Ready</p>
            <p className="text-[11px] text-slate-400 mt-1">Daily Charge: $500.00</p>
          </div>

          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">Bed ICU-103</span>
              <Badge variant="success">Available</Badge>
            </div>
            <p className="text-xs font-medium text-slate-500">Sanitized & Ready</p>
            <p className="text-[11px] text-slate-400 mt-1">Daily Charge: $500.00</p>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-white">Bed ICU-104</span>
              <Badge variant="warning">Maintenance</Badge>
            </div>
            <p className="text-xs font-medium text-slate-500">Equipment Calibration</p>
            <p className="text-[11px] text-slate-400 mt-1">Ventilator Check</p>
          </div>
        </div>
      </div>

      {/* Record Vitals Modal */}
      <Modal
        isOpen={isVitalsModalOpen}
        onClose={() => setIsVitalsModalOpen(false)}
        title="Record Clinical Patient Vitals"
        maxWidth="md"
      >
        {successMsg && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-500 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Vitals recorded to patient EMR chart successfully!
          </div>
        )}

        <form onSubmit={handleRecordVitals} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient</label>
            <select className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white">
              <option>Arthur Pendelton (MRN-2026-0001) - ICU-101</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Systolic BP (mmHg)</label>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Diastolic BP (mmHg)</label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Heart Rate</label>
              <input
                type="number"
                value={hr}
                onChange={(e) => setHr(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Temp (°C)</label>
              <input
                type="number"
                step="0.1"
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">SpO2 (%)</label>
              <input
                type="number"
                value={spO2}
                onChange={(e) => setSpO2(Number(e.target.value))}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsVitalsModalOpen(false)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
            >
              Submit Vitals
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
