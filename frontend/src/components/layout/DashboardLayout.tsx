import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { VoiceAssistantBar } from '../voice/VoiceAssistantBar';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      <Sidebar />
      <div className="pl-64 transition-all flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
      <VoiceAssistantBar />
    </div>
  );
};
