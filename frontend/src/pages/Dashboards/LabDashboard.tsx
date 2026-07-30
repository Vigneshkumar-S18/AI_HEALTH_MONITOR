import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { TestTube, FileCheck, Upload, CheckCircle, Clock, FileText } from 'lucide-react';

export const LabDashboard: React.FC = () => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [resultVal, setResultVal] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);

  const mockLabWorklist = [
    {
      id: 'lab-ord-1',
      patientName: 'Arthur Pendelton',
      mrn: 'MRN-2026-0001',
      testName: 'Complete Blood Count (CBC)',
      code: 'LAB-CBC-01',
      category: 'Hematology',
      requestedBy: 'Dr. Sarah Jenkins',
      status: 'PENDING',
      normalRange: 'WBC: 4.5-11.0, RBC: 4.3-5.9 x10^3/µL',
    },
    {
      id: 'lab-ord-2',
      patientName: 'Arthur Pendelton',
      mrn: 'MRN-2026-0001',
      testName: 'Lipid Panel Profile',
      code: 'LAB-LIPID-02',
      category: 'Biochemistry',
      requestedBy: 'Dr. Sarah Jenkins',
      status: 'SAMPLE_COLLECTED',
      normalRange: 'Total Cholesterol < 200 mg/dL',
    },
    {
      id: 'lab-ord-3',
      patientName: 'Elena Rostova',
      mrn: 'MRN-2026-0004',
      testName: 'Cardiac Troponin I',
      code: 'LAB-TROP-09',
      category: 'Biochemistry',
      requestedBy: 'Dr. Sarah Jenkins',
      status: 'COMPLETED',
      normalRange: '< 0.04 ng/mL',
      resultValue: '0.01 ng/mL (Normal)',
    },
  ];

  const handleOpenEntry = (order: any) => {
    setSelectedOrder(order);
    setResultVal(order.code === 'LAB-CBC-01' ? 'WBC: 6.8, RBC: 4.9, Hb: 14.2 g/dL' : 'Total Cholesterol: 185 mg/dL, HDL: 48, LDL: 110');
    setNotes('Specimen processed without hemolysis.');
    setIsResultModalOpen(true);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsResultModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Diagnostic Laboratory & Pathology Console
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Pending specimen worklist, laboratory results entry, and diagnostic report publishing
          </p>
        </div>
        <Badge variant="info">Lab Processing Queue Active</Badge>
      </div>

      {/* Lab Orders Worklist Table */}
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4">Diagnostic Test Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="pb-3">Patient</th>
                <th className="pb-3">Test Name & Code</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Requested By</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {mockLabWorklist.map((order) => (
                <tr key={order.id}>
                  <td className="py-3.5">
                    <p className="font-bold text-slate-900 dark:text-white">{order.patientName}</p>
                    <p className="font-mono text-[11px] text-sky-500">{order.mrn}</p>
                  </td>
                  <td>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{order.testName}</p>
                    <p className="font-mono text-[11px] text-slate-400">{order.code}</p>
                  </td>
                  <td><Badge variant="neutral">{order.category}</Badge></td>
                  <td>{order.requestedBy}</td>
                  <td>
                    <Badge variant={order.status === 'COMPLETED' ? 'success' : order.status === 'SAMPLE_COLLECTED' ? 'info' : 'warning'}>
                      {order.status.replace('_', ' ')}
                    </Badge>
                  </td>
                  <td className="text-right">
                    {order.status !== 'COMPLETED' ? (
                      <button
                        onClick={() => handleOpenEntry(order)}
                        className="rounded-xl bg-sky-500 px-3 py-1.5 text-xs font-bold text-white hover:bg-sky-400 shadow-sm shadow-sky-500/20"
                      >
                        Enter Results
                      </button>
                    ) : (
                      <span className="text-emerald-500 font-semibold flex items-center justify-end gap-1">
                        <CheckCircle className="h-3.5 w-3.5" /> Published
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Entry Modal */}
      {selectedOrder && (
        <Modal
          isOpen={isResultModalOpen}
          onClose={() => setIsResultModalOpen(false)}
          title={`Upload Test Result — ${selectedOrder.testName}`}
          maxWidth="lg"
        >
          {success && (
            <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-500 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Lab Report completed and attached to patient record!
            </div>
          )}

          <form onSubmit={handleSaveResult} className="space-y-4">
            <div className="rounded-xl bg-slate-100 dark:bg-slate-800/60 p-3 text-xs space-y-1">
              <p><span className="font-bold text-slate-700 dark:text-slate-300">Patient:</span> {selectedOrder.patientName} ({selectedOrder.mrn})</p>
              <p><span className="font-bold text-slate-700 dark:text-slate-300">Normal Range:</span> {selectedOrder.normalRange}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Measured Value / Readings</label>
              <textarea
                rows={3}
                required
                value={resultVal}
                onChange={(e) => setResultVal(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Technician Remarks & Observations</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setIsResultModalOpen(false)}
                className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
              >
                Publish Verified Report
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
