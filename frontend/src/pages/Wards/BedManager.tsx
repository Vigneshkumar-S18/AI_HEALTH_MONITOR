import React from 'react';
import { Badge } from '../../components/ui/Badge';
import { Bed as BedIcon, Building2, User } from 'lucide-react';

export const BedManager: React.FC = () => {
  const wards = [
    {
      id: 'w-1',
      name: 'Intensive Care Unit (ICU)',
      type: 'ICU',
      capacity: 10,
      beds: [
        { id: 'b-1', number: 'ICU-101', status: 'OCCUPIED', patientName: 'Arthur Pendelton', charge: 500 },
        { id: 'b-2', number: 'ICU-102', status: 'AVAILABLE', patientName: null, charge: 500 },
        { id: 'b-3', number: 'ICU-103', status: 'AVAILABLE', patientName: null, charge: 500 },
        { id: 'b-4', number: 'ICU-104', status: 'MAINTENANCE', patientName: null, charge: 500 },
      ],
    },
    {
      id: 'w-2',
      name: 'General Ward Block A',
      type: 'GENERAL',
      capacity: 20,
      beds: [
        { id: 'b-5', number: 'GEN-201', status: 'AVAILABLE', patientName: null, charge: 150 },
        { id: 'b-6', number: 'GEN-202', status: 'OCCUPIED', patientName: 'Robert Langdon', charge: 150 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Wards & Bed Allocation Matrix
        </h2>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Inpatient ward management, bed availability, and daily room charges
        </p>
      </div>

      <div className="space-y-6">
        {wards.map((ward) => (
          <div key={ward.id} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">{ward.name}</h3>
                <p className="text-xs text-slate-500">Capacity: {ward.capacity} Beds • Type: {ward.type}</p>
              </div>
              <Badge variant="info">{ward.beds.filter((b) => b.status === 'AVAILABLE').length} Beds Available</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {ward.beds.map((bed) => (
                <div
                  key={bed.id}
                  className={`rounded-xl border p-4 transition-all ${
                    bed.status === 'OCCUPIED'
                      ? 'border-rose-500/30 bg-rose-500/5'
                      : bed.status === 'AVAILABLE'
                      ? 'border-emerald-500/30 bg-emerald-500/5'
                      : 'border-amber-500/30 bg-amber-500/5'
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-extrabold text-slate-900 dark:text-white text-sm">{bed.number}</span>
                    <Badge variant={bed.status === 'OCCUPIED' ? 'error' : bed.status === 'AVAILABLE' ? 'success' : 'warning'}>
                      {bed.status}
                    </Badge>
                  </div>
                  {bed.patientName ? (
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{bed.patientName}</p>
                  ) : (
                    <p className="text-xs text-slate-400">Unoccupied</p>
                  )}
                  <p className="text-[11px] text-slate-400 mt-2">${bed.charge}.00 / day</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
