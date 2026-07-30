import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Stethoscope, User, Heart, Activity, FileText, Pill, Plus, CheckCircle, Clock } from 'lucide-react';

export const DoctorDashboard: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [subjective, setSubjective] = useState('');
  const [objective, setObjective] = useState('');
  const [assessment, setAssessment] = useState('');
  const [plan, setPlan] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const mockQueue = [
    {
      id: 'appt-1',
      token: 1,
      patientName: 'Arthur Pendelton',
      mrn: 'MRN-2026-0001',
      age: 41,
      gender: 'Male',
      reason: 'Chest tightness & shortness of breath',
      status: 'IN_CONSULTATION',
      bp: '120/80',
      hr: 72,
      spO2: 98,
    },
    {
      id: 'appt-2',
      token: 2,
      patientName: 'Elena Rostova',
      mrn: 'MRN-2026-0004',
      age: 34,
      gender: 'Female',
      reason: 'Post-op Cardiac Bypass follow-up',
      status: 'SCHEDULED',
      bp: '115/75',
      hr: 68,
      spO2: 99,
    },
    {
      id: 'appt-3',
      token: 3,
      patientName: 'Robert Langdon',
      mrn: 'MRN-2026-0008',
      age: 52,
      gender: 'Male',
      reason: 'Hypertension evaluation & medication check',
      status: 'SCHEDULED',
      bp: '142/90',
      hr: 81,
      spO2: 96,
    },
  ];

  const handleStartConsultation = (patient: any) => {
    setSelectedPatient(patient);
    setSubjective('Patient reports precordial tightness on physical exertion past 3 days.');
    setObjective(`Vitals: BP ${patient.bp} mmHg, HR ${patient.hr} bpm, SpO2 ${patient.spO2}%. Chest clear.`);
    setAssessment('Suspected Angina Pectoris (ICD-10 I20.9).');
    setPlan('Prescribe Atorvastatin 20mg nocte, Amoxicillin 500mg. Order CBC & Lipid Panel.');
    setIsConsultModalOpen(true);
  };

  const handleSaveSOAP = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsConsultModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Doctor Workspace & Patient Queue
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Dr. Sarah Jenkins • Cardiology OPD Clinic 4B
          </p>
        </div>
        <Badge variant="success">Clinic Online</Badge>
      </div>

      {/* Patient Queue Matrix */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Today's OPD Queue</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockQueue.map((patient) => (
            <div
              key={patient.id}
              className={`rounded-2xl border p-5 transition-all ${
                patient.status === 'IN_CONSULTATION'
                  ? 'border-sky-500/50 bg-sky-500/5 dark:bg-sky-500/10 shadow-lg shadow-sky-500/10'
                  : 'border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white font-bold text-xs">
                  #{patient.token}
                </span>
                <Badge variant={patient.status === 'IN_CONSULTATION' ? 'info' : 'neutral'}>
                  {patient.status.replace('_', ' ')}
                </Badge>
              </div>

              <h4 className="text-base font-bold text-slate-900 dark:text-white">{patient.patientName}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{patient.mrn} • {patient.age} yrs • {patient.gender}</p>

              <div className="mt-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-xs space-y-1">
                <p className="font-semibold text-slate-700 dark:text-slate-300">Reason:</p>
                <p className="text-slate-600 dark:text-slate-400">{patient.reason}</p>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
                <span>BP: {patient.bp}</span>
                <span>HR: {patient.hr} bpm</span>
                <span>SpO2: {patient.spO2}%</span>
              </div>

              <button
                onClick={() => handleStartConsultation(patient)}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl bg-sky-500 py-2.5 text-xs font-bold text-white hover:bg-sky-400 transition-colors shadow-md shadow-sky-500/20"
              >
                <Stethoscope className="h-4 w-4" />
                {patient.status === 'IN_CONSULTATION' ? 'Continue SOAP Notes' : 'Start Consultation'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Consultation Modal with SOAP Notes */}
      {selectedPatient && (
        <Modal
          isOpen={isConsultModalOpen}
          onClose={() => setIsConsultModalOpen(false)}
          title={`Clinical Consultation — ${selectedPatient.patientName} (${selectedPatient.mrn})`}
          maxWidth="2xl"
        >
          {savedSuccess && (
            <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-xs font-bold text-emerald-500 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              SOAP Notes and Prescriptions saved to EMR record successfully!
            </div>
          )}

          <form onSubmit={handleSaveSOAP} className="space-y-4">
            {/* Vitals Quick Summary */}
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 flex items-center justify-around text-xs font-semibold">
              <span className="text-slate-700 dark:text-slate-300">BP: {selectedPatient.bp} mmHg</span>
              <span className="text-slate-700 dark:text-slate-300">Heart Rate: {selectedPatient.hr} bpm</span>
              <span className="text-slate-700 dark:text-slate-300">SpO2: {selectedPatient.spO2}%</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Subjective (S) — Patient Symptoms
              </label>
              <textarea
                rows={2}
                value={subjective}
                onChange={(e) => setSubjective(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Objective (O) — Physical Exam Findings
              </label>
              <textarea
                rows={2}
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Assessment (A) — ICD Diagnosis & Clinical Evaluation
              </label>
              <textarea
                rows={2}
                value={assessment}
                onChange={(e) => setAssessment(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Plan (P) — Prescriptions, Lab Orders & Follow-up
              </label>
              <textarea
                rows={2}
                value={plan}
                onChange={(e) => setPlan(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsConsultModalOpen(false)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
              >
                Save Clinical SOAP Record
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
