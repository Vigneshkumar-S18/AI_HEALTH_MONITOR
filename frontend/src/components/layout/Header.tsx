import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sun,
  Moon,
  Search,
  Bell,
  Building2,
  ChevronDown,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { UserRole } from '../../types';

export const Header: React.FC = () => {
  const { user, hospital, quickLoginAsRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  const rolesList: { role: UserRole; label: string }[] = [
    { role: 'ADMIN', label: 'Hospital Administrator' },
    { role: 'DOCTOR', label: 'Doctor (Cardiology)' },
    { role: 'RECEPTIONIST', label: 'Receptionist' },
    { role: 'NURSE', label: 'Nurse (Station 1)' },
    { role: 'LAB_TECH', label: 'Lab Technician' },
    { role: 'PHARMACIST', label: 'Pharmacist' },
    { role: 'PATIENT', label: 'Patient Portal' },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 px-6 backdrop-blur-md">
      {/* Search Input */}
      <div className="relative flex items-center w-80">
        <Search className="absolute left-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search patients, MRN, doctors..."
          className="w-full rounded-xl bg-slate-100 dark:bg-slate-800/60 pl-9 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Hospital Tenant Tag */}
        <div className="hidden md:flex items-center gap-2 rounded-xl bg-sky-500/10 px-3 py-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 border border-sky-500/20">
          <Building2 className="h-4 w-4" />
          <span>{hospital?.name || 'City Care General Hospital'}</span>
        </div>

        {/* Quick Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowRoleSelector(!showRoleSelector)}
            className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            <UserCheck className="h-4 w-4 text-sky-500" />
            <span>Switch Role ({user?.role})</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {showRoleSelector && (
            <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                Switch Perspective
              </div>
              {rolesList.map((r) => (
                <button
                  key={r.role}
                  onClick={() => {
                    quickLoginAsRole(r.role);
                    setShowRoleSelector(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between ${
                    user?.role === r.role ? 'text-sky-500 font-bold bg-sky-500/10' : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{r.label}</span>
                  {user?.role === r.role && <span className="h-2 w-2 rounded-full bg-sky-500"></span>}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <button className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition-colors"
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
        </button>
      </div>
    </header>
  );
};
