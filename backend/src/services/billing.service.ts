import { prisma } from '../database/client';
import { InvoiceStatus } from '@prisma/client';

export class BillingService {
  static async listInvoices(hospitalId: string) {
    return prisma.invoice.findMany({
      where: { hospitalId },
      include: {
        patient: true,
        appointment: { include: { doctor: { include: { user: true } } } },
        items: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async createInvoice(hospitalId: string, data: any) {
    const count = await prisma.invoice.count({ where: { hospitalId } });
    const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(5, '0')}`;

    let totalAmount = 0;
    const itemsData = data.items.map((item: any) => {
      const totalPrice = item.quantity * item.unitPrice;
      totalAmount += totalPrice;
      return {
        description: item.description,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice,
      };
    });

    const discount = data.discount || 0;
    const tax = data.tax || 0;
    const netAmount = totalAmount - discount + tax;

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    return prisma.invoice.create({
      data: {
        hospitalId,
        patientId: data.patientId,
        appointmentId: data.appointmentId,
        invoiceNumber,
        totalAmount,
        discount,
        tax,
        netAmount,
        status: InvoiceStatus.UNPAID,
        dueDate,
        items: { create: itemsData },
      },
      include: { items: true, patient: true },
    });
  }

  static async recordPayment(hospitalId: string, data: any) {
    const invoice = await prisma.invoice.findUnique({
      where: { id: data.invoiceId },
      include: { payments: true },
    });

    if (!invoice) throw { statusCode: 404, message: 'Invoice not found.' };

    const payment = await prisma.payment.create({
      data: {
        invoiceId: data.invoiceId,
        amount: data.amount,
        method: data.method,
        transactionId: data.transactionId || `TXN-${Date.now()}`,
      },
    });

    const totalPaid = invoice.payments.reduce((acc, p) => acc + Number(p.amount), 0) + Number(data.amount);
    const newStatus = totalPaid >= Number(invoice.netAmount) ? InvoiceStatus.PAID : InvoiceStatus.PARTIALLY_PAID;

    await prisma.invoice.update({
      where: { id: data.invoiceId },
      data: { status: newStatus },
    });

    return payment;
  }
}
