import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Calendar, Clock, Stethoscope, User, Plus } from 'lucide-react';

export const AppointmentManager: React.FC = () => {
  const appointments = [
    {
      id: 'app-1',
      patientName: 'Arthur Pendelton',
      mrn: 'MRN-2026-0001',
      doctorName: 'Dr. Sarah Jenkins',
      dept: 'Cardiology',
      date: 'Today, 10:30 AM',
      token: 1,
      type: 'WALK_IN',
      status: 'IN_CONSULTATION',
    },
    {
      id: 'app-2',
      patientName: 'Maria Garcia',
      mrn: 'MRN-2026-0002',
      doctorName: 'Dr. Robert Vance',
      dept: 'Neurology',
      date: 'Today, 11:15 AM',
      token: 2,
      type: 'ONLINE',
      status: 'SCHEDULED',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Appointment Booking & Queue Engine
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Schedule walk-in and online consultations across hospital departments
          </p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20">
          <Plus className="h-4 w-4" /> Book Appointment
        </button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="pb-3">Token #</th>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Doctor & Dept</th>
                <th className="pb-3">Date & Time</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {appointments.map((app) => (
                <tr key={app.id}>
                  <td className="py-3 font-bold text-sky-500">#{app.token}</td>
                  <td>
                    <p className="font-bold text-slate-900 dark:text-white">{app.patientName}</p>
                    <p className="font-mono text-[11px] text-slate-400">{app.mrn}</p>
                  </td>
                  <td>
                    <p className="font-semibold">{app.doctorName}</p>
                    <p className="text-slate-400">{app.dept}</p>
                  </td>
                  <td>{app.date}</td>
                  <td><Badge variant="neutral">{app.type}</Badge></td>
                  <td>
                    <Badge variant={app.status === 'IN_CONSULTATION' ? 'info' : 'warning'}>
                      {app.status.replace('_', ' ')}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
