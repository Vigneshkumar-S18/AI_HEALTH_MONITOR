import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Pill, AlertTriangle, CheckCircle, PackagePlus, ShoppingBag, Barcode } from 'lucide-react';

export const PharmacyDashboard: React.FC = () => {
  const [isDispenseModalOpen, setIsDispenseModalOpen] = useState(false);
  const [selectedRx, setSelectedRx] = useState<any>(null);
  const [dispensed, setDispensed] = useState(false);

  const mockMedicines = [
    {
      id: 'med-1',
      name: 'Amoxicillin 500mg',
      category: 'Capsule',
      stockQuantity: 450,
      reorderLevel: 50,
      unitPrice: 12.50,
      batch: 'BATCH-AMX-2026',
      expiry: '2027-12-31',
    },
    {
      id: 'med-2',
      name: 'Atorvastatin 20mg',
      category: 'Tablet',
      stockQuantity: 15,
      reorderLevel: 30,
      unitPrice: 18.00,
      batch: 'BATCH-ATV-2026',
      expiry: '2027-08-30',
    },
  ];

  const mockPendingRx = [
    {
      id: 'rx-101',
      patientName: 'Arthur Pendelton',
      mrn: 'MRN-2026-0001',
      doctorName: 'Dr. Sarah Jenkins',
      issuedAt: 'Today 10:30 AM',
      items: [
        { name: 'Amoxicillin 500mg', dosage: '1-0-1', qty: 10 },
        { name: 'Atorvastatin 20mg', dosage: '0-0-1', qty: 30 },
      ],
      status: 'PENDING',
    },
  ];

  const handleOpenDispense = (rx: any) => {
    setSelectedRx(rx);
    setIsDispenseModalOpen(true);
  };

  const handleDispense = () => {
    setDispensed(true);
    setTimeout(() => {
      setDispensed(false);
      setIsDispenseModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Central Pharmacy & Stock Inventory
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Prescription fulfillment, inventory stock levels, and barcode dispensing console
          </p>
        </div>
        <Badge variant="warning" size="md">1 Low Stock Alert</Badge>
      </div>

      {/* Stock Alerts & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Total SKU Inventory</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">465 SKUs</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500">
              <Pill className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-amber-500/30 bg-amber-500/5 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-amber-600 dark:text-amber-400">Reorder Stock Alert</p>
              <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">1 Drug Critical</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2">Atorvastatin 20mg (15 remaining, min 30)</p>
        </div>

        <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Pending Prescriptions</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">1 Queue</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Pending Prescriptions Section */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Doctor Prescriptions Awaiting Dispensing</h3>

        <div className="space-y-4">
          {mockPendingRx.map((rx) => (
            <div key={rx.id} className="rounded-xl border border-slate-200/80 dark:border-slate-800 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{rx.patientName}</h4>
                  <span className="font-mono text-xs text-sky-500">({rx.mrn})</span>
                  <Badge variant="warning">{rx.status}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">Prescribed by {rx.doctorName} • {rx.issuedAt}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {rx.items.map((item, idx) => (
                    <span key={idx} className="rounded-lg bg-slate-100 dark:bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                      💊 {item.name} ({item.dosage}) x{item.qty}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleOpenDispense(rx)}
                className="w-full md:w-auto flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
              >
                <Barcode className="h-4 w-4" />
                Validate & Dispense
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Dispense Modal */}
      {selectedRx && (
        <Modal
          isOpen={isDispenseModalOpen}
          onClose={() => setIsDispenseModalOpen(false)}
          title={`Dispense Medication — ${selectedRx.patientName}`}
          maxWidth="md"
        >
          {dispensed && (
            <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-500 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Medication dispensed! Stock quantities updated.
            </div>
          )}

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-xs space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Validation Summary:</p>
              {selectedRx.items.map((item: any, i: number) => (
                <div key={i} className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                  <span>{item.name} ({item.dosage})</span>
                  <span className="font-bold text-sky-500">Qty: {item.qty}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setIsDispenseModalOpen(false)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDispense}
                className="rounded-xl bg-emerald-500 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-400 shadow-md shadow-emerald-500/20"
              >
                Confirm Dispensing
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
