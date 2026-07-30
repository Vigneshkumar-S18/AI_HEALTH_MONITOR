import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { UserPlus, Ticket, Calendar, Search, CreditCard, CheckCircle, Clock } from 'lucide-react';

export const ReceptionDashboard: React.FC = () => {
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [generatedToken, setGeneratedToken] = useState<number | null>(null);

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('MALE');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('1990-01-01');

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault();
    const token = Math.floor(Math.random() * 20) + 5;
    setGeneratedToken(token);
    setTimeout(() => {
      setIsRegModalOpen(false);
      setGeneratedToken(null);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Front Desk & Patient Reception Console
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Walk-in registration, token queue dispenser, and appointment scheduling
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsRegModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20 transition-all"
          >
            <UserPlus className="h-4 w-4" />
            Walk-in Registration
          </button>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
              <Ticket className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Queue Tokens</h3>
              <p className="text-xs text-slate-500">OPD OPD-1 Cardiology</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">18</span>
            <span className="text-xs text-emerald-500 font-semibold">Patients waiting</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Today's Bookings</h3>
              <p className="text-xs text-slate-500">Scheduled Visits</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">42</span>
            <span className="text-xs text-sky-500 font-semibold">Checked-in: 28</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pending Billing</h3>
              <p className="text-xs text-slate-500">Unpaid Invoices</p>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">6</span>
            <span className="text-xs text-amber-500 font-semibold">Awaiting Desk Collection</span>
          </div>
        </div>
      </div>

      {/* Patient Directory Quick View Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Recent Walk-in Patients</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="pb-3">MRN Number</th>
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Assigned Doctor</th>
                <th className="pb-3">Token #</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="py-3 font-mono font-bold text-sky-500">MRN-2026-0001</td>
                <td>Arthur Pendelton</td>
                <td>+1 (555) 777-8888</td>
                <td>Dr. Sarah Jenkins (Cardiology)</td>
                <td><span className="font-bold text-slate-900 dark:text-white">Token #1</span></td>
                <td><Badge variant="info">In Consultation</Badge></td>
              </tr>
              <tr>
                <td className="py-3 font-mono font-bold text-sky-500">MRN-2026-0002</td>
                <td>Maria Garcia</td>
                <td>+1 (555) 888-9999</td>
                <td>Dr. Robert Vance (Neurology)</td>
                <td><span className="font-bold text-slate-900 dark:text-white">Token #2</span></td>
                <td><Badge variant="warning">Waiting in Queue</Badge></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Walk-in Registration Modal */}
      <Modal
        isOpen={isRegModalOpen}
        onClose={() => setIsRegModalOpen(false)}
        title="Walk-in Patient Registration & Token Dispenser"
        maxWidth="lg"
      >
        {generatedToken && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-4 text-center">
            <p className="text-xs font-semibold text-emerald-400">Patient Registered & Queue Token Generated!</p>
            <p className="text-4xl font-extrabold text-emerald-500 my-2">TOKEN #{generatedToken}</p>
            <p className="text-[11px] text-slate-400">Assigned to Cardiology OPD Clinic 4B</p>
          </div>
        )}

        <form onSubmit={handleRegisterPatient} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">First Name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Last Name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Assigned OPD Department & Doctor</label>
            <select className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50">
              <option>Dr. Sarah Jenkins — Cardiology (Fee $150)</option>
              <option>Dr. Robert Vance — Neurology (Fee $175)</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsRegModalOpen(false)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
            >
              Register & Dispense Token
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
