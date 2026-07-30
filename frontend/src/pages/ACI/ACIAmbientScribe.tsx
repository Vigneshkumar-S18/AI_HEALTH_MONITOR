import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Mic, MicOff, Sparkles, CheckCircle, FileText, Stethoscope, ShieldCheck, Tag, Lock } from 'lucide-react';

export const ACIAmbientScribe: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptGenerated, setTranscriptGenerated] = useState(true);
  const [isSigned, setIsSigned] = useState(false);

  const diarizedConversation = [
    { speaker: 'Doctor', text: 'Good morning Arthur! How are you feeling after climbing stairs today?' },
    { speaker: 'Patient', text: 'Good morning Doctor. I felt precordial heaviness for about 10 minutes.' },
    { speaker: 'Doctor', text: 'Any chest pain radiating to your jaw or left arm? And how are your vitals?' },
    { speaker: 'Patient', text: 'No radiation to my arm. Blood pressure was 120/80 mmHg this morning.' },
    { speaker: 'Doctor', text: 'Good. I will start Atorvastatin 20mg and order a Complete Blood Count test.' },
  ];

  const extractedEntities = [
    { category: 'Symptom', name: 'Precordial chest heaviness', conf: '98.5%' },
    { category: 'Vital', name: 'BP 120/80 mmHg', conf: '99.2%' },
    { category: 'Diagnosis', name: 'Angina Pectoris (I20.9)', conf: '94.1%' },
    { category: 'Medication', name: 'Atorvastatin 20mg PO', conf: '97.8%' },
    { category: 'Lab Order', name: 'Complete Blood Count (CBC)', conf: '96.5%' },
  ];

  const suggestedCodes = [
    { codeSystem: 'ICD-10', code: 'I20.9', title: 'Angina pectoris, unspecified', conf: '94.5%', evidence: 'precordial heaviness when climbing stairs' },
    { codeSystem: 'CPT', code: '99214', title: 'Office visit established patient (30-39 mins)', conf: '96.0%', evidence: 'Detailed history & moderate complexity MDM' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Ambient Clinical Intelligence (ACI) & Audio Scribe
            <Sparkles className="h-5 w-5 text-sky-500" />
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Real-time conversation diarization, clinical entity extraction, and automated SOAP note drafting
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md ${
              isRecording
                ? 'bg-rose-500 hover:bg-rose-600 animate-pulse shadow-rose-500/30'
                : 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-sky-500/20'
            }`}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            {isRecording ? 'Stop Ambient Recording' : 'Start Ambient Consultation Audio'}
          </button>
        </div>
      </div>

      {isSigned && (
        <div className="rounded-2xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-xs font-bold text-emerald-500 flex items-center gap-2">
          <CheckCircle className="h-5 w-5" />
          Clinical Note & Billing Codes Signed & Committed to EMR Chart (Dr. Sarah Jenkins)
        </div>
      )}

      {/* Main Ambient Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Real-Time Diarized Conversation */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col h-[560px]">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Mic className="h-4 w-4 text-sky-500" /> Diarized Conversation Transcript
            </h3>
            {isRecording && <Badge variant="error">Live Recording</Badge>}
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {diarizedConversation.map((line, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-3 text-xs leading-relaxed ${
                  line.speaker === 'Doctor'
                    ? 'bg-sky-500/10 border border-sky-500/20 text-slate-900 dark:text-slate-100'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200'
                }`}
              >
                <p className="font-bold mb-1 text-[11px] text-sky-600 dark:text-sky-400">{line.speaker}:</p>
                <p>{line.text}</p>
              </div>
            ))}
          </div>

          {/* Extracted NLP Entities Badges */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Extracted Medical Entities</p>
            <div className="flex flex-wrap gap-1.5">
              {extractedEntities.map((e, i) => (
                <span key={i} className="rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                  <span className="text-sky-500 font-semibold">{e.category}:</span> {e.name} ({e.conf})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Column: Auto-Generated SOAP Note Draft */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between h-[560px]">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-500" /> AI Scribe SOAP Note Draft
              </h3>
              <Badge variant="info">Human Review Required</Badge>
            </div>

            <div className="space-y-3 text-xs overflow-y-auto max-h-[380px] pr-2">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-500 uppercase text-[10px]">Subjective (S)</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1">41-year-old male presents with exertional precordial heaviness past 3 days. Denies radiation.</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-500 uppercase text-[10px]">Objective (O)</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1">BP 120/80 mmHg, HR 72 bpm, SpO2 98%. Normal S1/S2 heart sounds.</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-500 uppercase text-[10px]">Assessment (A)</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1">Suspected Stable Angina Pectoris (ICD-10 I20.9).</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-sky-500 uppercase text-[10px]">Plan (P)</span>
                <p className="text-slate-700 dark:text-slate-300 mt-1">Start Atorvastatin 20mg PO nocte. Order Complete Blood Count (CBC) & Lipid Panel.</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsSigned(true)}
              disabled={isSigned}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-white hover:bg-emerald-400 shadow-md shadow-emerald-500/20 disabled:opacity-50"
            >
              <CheckCircle className="h-4 w-4" />
              {isSigned ? 'Approved & Signed by Clinician' : 'Review, Edit & Sign Note into EMR'}
            </button>
          </div>
        </div>

        {/* Right Column: Automated ICD-10 & CPT Clinical Coding Assistant */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="h-4 w-4 text-emerald-500" /> Candidate Clinical Codes
            </h3>
            <Badge variant="warning">Doctor Approval Required</Badge>
          </div>

          <div className="space-y-3">
            {suggestedCodes.map((c, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-sky-500 text-sm">{c.codeSystem} {c.code}</span>
                  <Badge variant="success">{c.conf} Confidence</Badge>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{c.title}</p>
                <p className="text-[11px] text-slate-400 italic">Evidence: "{c.evidence}"</p>
                <button className="w-full rounded-xl bg-slate-100 dark:bg-slate-800 py-1.5 text-[11px] font-bold text-slate-700 dark:text-slate-300 hover:bg-sky-500/10 hover:text-sky-500 transition-colors">
                  Approve Candidate Code
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
