import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Users, Search, Plus, UserPlus, Phone, Calendar, Heart, FileText } from 'lucide-react';

export const PatientList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const mockPatients = [
    {
      id: 'p-1',
      mrn: 'MRN-2026-0001',
      firstName: 'Arthur',
      lastName: 'Pendelton',
      gender: 'MALE',
      dob: '1985-04-12',
      phone: '+1 (555) 777-8888',
      email: 'patient@medflow.com',
      bloodGroup: 'O+',
      allergies: 'Penicillin, Dust Mites',
      systolicBp: 120,
      diastolicBp: 80,
      heartRate: 72,
      spO2: 98,
      status: 'Admitted (ICU-101)',
    },
    {
      id: 'p-2',
      mrn: 'MRN-2026-0002',
      firstName: 'Maria',
      lastName: 'Garcia',
      gender: 'FEMALE',
      dob: '1992-09-24',
      phone: '+1 (555) 888-9999',
      email: 'maria.garcia@email.com',
      bloodGroup: 'A+',
      allergies: 'None',
      systolicBp: 115,
      diastolicBp: 75,
      heartRate: 68,
      spO2: 99,
      status: 'Outpatient (OPD)',
    },
  ];

  const filteredPatients = mockPatients.filter(
    (p) =>
      p.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.mrn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Page Title & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patient Directory & EMR Charts
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Comprehensive Medical Record Numbers (MRN), clinical history, and patient vitals
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, MRN, phone..."
              className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 pl-9 pr-4 py-2 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
          >
            <UserPlus className="h-4 w-4" />
            New Patient
          </button>
        </div>
      </div>

      {/* Patient Directory Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="pb-3">MRN Number</th>
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Gender / DOB</th>
                <th className="pb-3">Phone & Email</th>
                <th className="pb-3">Latest Vitals</th>
                <th className="pb-3">Allergies</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 font-mono font-bold text-sky-500">{patient.mrn}</td>
                  <td>
                    <p className="font-bold text-slate-900 dark:text-white">
                      {patient.firstName} {patient.lastName}
                    </p>
                    <Badge variant="info">{patient.status}</Badge>
                  </td>
                  <td>
                    <p className="capitalize">{patient.gender.toLowerCase()}</p>
                    <p className="text-slate-400">{patient.dob}</p>
                  </td>
                  <td>
                    <p>{patient.phone}</p>
                    <p className="text-slate-400">{patient.email}</p>
                  </td>
                  <td>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {patient.systolicBp}/{patient.diastolicBp} mmHg
                    </span>
                    <p className="text-slate-400">{patient.heartRate} bpm • SpO2 {patient.spO2}%</p>
                  </td>
                  <td>
                    <Badge variant={patient.allergies === 'None' ? 'neutral' : 'error'}>
                      {patient.allergies}
                    </Badge>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="rounded-xl border border-slate-200 dark:border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      View Chart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient EMR Chart Modal */}
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`EMR Clinical Record — ${selectedPatient.firstName} ${selectedPatient.lastName}`}
          maxWidth="2xl"
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">MRN Number</p>
                <p className="font-bold font-mono text-sky-500">{selectedPatient.mrn}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Blood Group</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedPatient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Phone</p>
                <p className="font-bold text-slate-900 dark:text-white">{selectedPatient.phone}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Known Allergies</p>
                <p className="font-bold text-rose-500">{selectedPatient.allergies}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Heart className="h-4 w-4 text-rose-500" /> Latest Recorded Vitals
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5">
                  <p className="text-slate-400 text-[10px]">Blood Pressure</p>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedPatient.systolicBp}/{selectedPatient.diastolicBp}</p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5">
                  <p className="text-slate-400 text-[10px]">Heart Rate</p>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedPatient.heartRate} bpm</p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-950 p-2.5">
                  <p className="text-slate-400 text-[10px]">Oxygen Saturation</p>
                  <p className="font-bold text-sm text-slate-900 dark:text-white">{selectedPatient.spO2}%</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
