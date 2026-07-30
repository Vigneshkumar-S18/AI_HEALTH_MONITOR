import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { ShieldAlert, Activity, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const PredictiveRiskAnalytics: React.FC = () => {
  const riskModels = [
    {
      name: 'Sepsis Deterioration Risk Score',
      score: '14.2%',
      category: 'LOW',
      variant: 'success' as const,
      shapFactors: ['+4% WBC Count', '+2% Temperature', '+3% Heart Rate'],
    },
    {
      name: '30-Day Hospital Readmission Risk',
      score: '18.5%',
      category: 'LOW',
      variant: 'success' as const,
      shapFactors: ['+8% Previous Admissions', '+5% Patient Age', '+5.5% Cardiac History'],
    },
    {
      name: 'ICU Mortality & Deterioration Index',
      score: '8.1%',
      category: 'LOW',
      variant: 'success' as const,
      shapFactors: ['-2% SpO2 Stability', '+3% Systolic BP Trend'],
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
          Predictive Patient Risk & Clinical Intelligence Models
          <ShieldAlert className="h-5 w-5 text-sky-500" />
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          SHAP-explained Machine Learning models predicting Sepsis, Readmission, and ICU Deterioration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {riskModels.map((m, i) => (
          <div key={i} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant={m.variant}>{m.category} RISK</Badge>
              <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{m.score}</span>
            </div>

            <h3 className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</h3>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-950 p-3 text-xs space-y-1">
              <p className="font-semibold text-slate-400 text-[10px] uppercase">SHAP Feature Importance Factors:</p>
              {m.shapFactors.map((factor, fIdx) => (
                <p key={fIdx} className="text-slate-700 dark:text-slate-300 font-mono">• {factor}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
