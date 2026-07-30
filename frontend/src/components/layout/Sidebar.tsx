import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Calendar,
  Pill,
  TestTube,
  Bed,
  CreditCard,
  Settings,
  Stethoscope,
  LogOut,
  Hospital as HospitalIcon,
  Video,
  Activity,
  Bot,
  MessageSquare,
  HeartHandshake,
  Watch,
  FileCheck,
  BookOpen,
  Sparkles,
  ShieldAlert,
  Eye,
  Building2,
  Clock,
  Layers,
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavItem {
  name: string;
  path: string;
  icon: any;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  // Phase 1 Nav Items
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE', 'LAB_TECH', 'PHARMACIST', 'PATIENT'] },
  { name: 'Patients', path: '/patients', icon: Users, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'NURSE'] },
  { name: 'Appointments', path: '/appointments', icon: Calendar, roles: ['ADMIN', 'DOCTOR', 'RECEPTIONIST', 'PATIENT'] },
  { name: 'Doctor Consultation', path: '/doctor/queue', icon: Stethoscope, roles: ['DOCTOR', 'ADMIN'] },
  { name: 'Wards & Beds', path: '/wards', icon: Bed, roles: ['ADMIN', 'NURSE', 'RECEPTIONIST', 'DOCTOR'] },
  { name: 'Pharmacy Stock', path: '/pharmacy', icon: Pill, roles: ['ADMIN', 'PHARMACIST', 'DOCTOR'] },
  { name: 'Laboratory', path: '/lab', icon: TestTube, roles: ['ADMIN', 'LAB_TECH', 'DOCTOR'] },
  { name: 'Billing & Invoices', path: '/billing', icon: CreditCard, roles: ['ADMIN', 'RECEPTIONIST', 'PATIENT'] },

  // Phase 2 Nav Items
  { name: 'Telemedicine Suite', path: '/telemedicine', icon: Video, roles: ['PATIENT', 'DOCTOR', 'ADMIN'] },
  { name: 'Recovery Tracker', path: '/recovery', icon: Activity, roles: ['PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'] },
  { name: 'RAG AI Assistant', path: '/ai-assistant', icon: Bot, roles: ['PATIENT', 'DOCTOR', 'ADMIN'] },
  { name: 'Secure Chat', path: '/chat', icon: MessageSquare, roles: ['PATIENT', 'DOCTOR', 'NURSE', 'ADMIN'] },
  { name: 'Caregiver Portal', path: '/caregiver', icon: HeartHandshake, roles: ['PATIENT', 'ADMIN'] },
  { name: 'Wearables Hub', path: '/wearables', icon: Watch, roles: ['PATIENT', 'DOCTOR', 'ADMIN'] },
  { name: 'Digital Forms', path: '/forms', icon: FileCheck, roles: ['PATIENT', 'RECEPTIONIST', 'ADMIN'] },
  { name: 'Health Education', path: '/education', icon: BookOpen, roles: ['PATIENT', 'ADMIN'] },

  // Phase 3 Ambient Clinical Intelligence Items
  { name: 'ACI Ambient Scribe', path: '/aci', icon: Sparkles, roles: ['DOCTOR', 'ADMIN'] },
  { name: 'Command Center', path: '/command-center', icon: Building2, roles: ['ADMIN', 'DOCTOR'] },
  { name: 'Digital Twin Timeline', path: '/digital-twin', icon: Layers, roles: ['DOCTOR', 'PATIENT', 'ADMIN'] },
  { name: 'Predictive Risk Models', path: '/predictive', icon: ShieldAlert, roles: ['DOCTOR', 'NURSE', 'ADMIN'] },
  { name: 'Wound Vision Tracker', path: '/vision', icon: Eye, roles: ['DOCTOR', 'NURSE', 'ADMIN'] },
  { name: 'Smart OR Suite', path: '/smart-or', icon: Stethoscope, roles: ['DOCTOR', 'NURSE', 'ADMIN'] },
  { name: 'AI Productivity Metrics', path: '/ai-analytics', icon: Clock, roles: ['ADMIN', 'DOCTOR'] },

  { name: 'Hospital Settings', path: '/settings', icon: Settings, roles: ['ADMIN'] },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  const filteredNavItems = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-all">
      {/* Brand Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 dark:border-slate-800/80 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25">
          <HospitalIcon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
            MedFlow <span className="text-sky-500">AI</span>
          </h1>
          <p className="text-[10px] font-semibold tracking-wider text-sky-500 uppercase">Enterprise Healthcare Platform</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Clinical & Operational Suite
        </div>
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      {/* User Footer Card */}
      <div className="border-t border-slate-200/80 dark:border-slate-800/80 p-4">
        <div className="flex items-center justify-between rounded-xl bg-slate-100 dark:bg-slate-800/50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-500 text-white font-bold text-sm">
              {user.firstName[0]}
            </div>
            <div className="overflow-hidden text-xs">
              <p className="truncate font-semibold text-slate-900 dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="truncate font-medium text-slate-500 dark:text-slate-400 capitalize">
                {user.role.toLowerCase()}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/10 hover:text-rose-500 transition-colors"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
