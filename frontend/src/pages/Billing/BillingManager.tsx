import React, { useState } from 'react';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { CreditCard, DollarSign, Plus, CheckCircle, FileText } from 'lucide-react';

export const BillingManager: React.FC = () => {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const mockInvoices = [
    {
      id: 'inv-101',
      invoiceNumber: 'INV-2026-00891',
      patientName: 'Arthur Pendelton',
      mrn: 'MRN-2026-0001',
      totalAmount: 195.00,
      tax: 9.75,
      netAmount: 204.75,
      status: 'PAID',
      date: '2026-07-30',
      method: 'CARD',
    },
    {
      id: 'inv-102',
      invoiceNumber: 'INV-2026-00892',
      patientName: 'Maria Garcia',
      mrn: 'MRN-2026-0002',
      totalAmount: 175.00,
      tax: 8.75,
      netAmount: 183.75,
      status: 'UNPAID',
      date: '2026-07-30',
      method: 'PENDING',
    },
  ];

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setIsInvoiceModalOpen(false);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Hospital Billing & Invoicing Engine
          </h2>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Generate patient invoices, record payments, and track outstanding ledger accounts
          </p>
        </div>
        <button
          onClick={() => setIsInvoiceModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-sky-500 px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
        >
          <Plus className="h-4 w-4" /> Create New Invoice
        </button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="pb-3">Invoice Number</th>
                <th className="pb-3">Patient Name</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Subtotal</th>
                <th className="pb-3">Net Payable</th>
                <th className="pb-3">Payment Method</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {mockInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="py-3 font-mono font-bold text-sky-500">{inv.invoiceNumber}</td>
                  <td>
                    <p className="font-bold text-slate-900 dark:text-white">{inv.patientName}</p>
                    <p className="font-mono text-[11px] text-slate-400">{inv.mrn}</p>
                  </td>
                  <td>{inv.date}</td>
                  <td>${inv.totalAmount.toFixed(2)}</td>
                  <td className="font-bold text-slate-900 dark:text-white">${inv.netAmount.toFixed(2)}</td>
                  <td><Badge variant="neutral">{inv.method}</Badge></td>
                  <td>
                    <Badge variant={inv.status === 'PAID' ? 'success' : 'error'}>
                      {inv.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Invoice Modal */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        title="Generate Patient Invoice"
        maxWidth="lg"
      >
        {success && (
          <div className="mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-500 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Invoice generated and queued for billing collection!
          </div>
        )}

        <form onSubmit={handleCreateInvoice} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient</label>
            <select className="w-full rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white">
              <option>Arthur Pendelton (MRN-2026-0001)</option>
              <option>Maria Garcia (MRN-2026-0002)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">Billable Line Items</label>
            <div className="flex gap-2">
              <input
                type="text"
                defaultValue="Cardiology Consultation Fee"
                className="w-2/3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
              />
              <input
                type="number"
                defaultValue="150"
                className="w-1/3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-2.5 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setIsInvoiceModalOpen(false)}
              className="rounded-xl border border-slate-300 dark:border-slate-700 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-sky-500 px-5 py-2 text-xs font-bold text-white hover:bg-sky-400 shadow-md shadow-sky-500/20"
            >
              Generate Invoice
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
