"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingService = void 0;
const client_1 = require("../database/client");
const client_2 = require("@prisma/client");
class BillingService {
    static async listInvoices(hospitalId) {
        return client_1.prisma.invoice.findMany({
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
    static async createInvoice(hospitalId, data) {
        const count = await client_1.prisma.invoice.count({ where: { hospitalId } });
        const invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(5, '0')}`;
        let totalAmount = 0;
        const itemsData = data.items.map((item) => {
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
        return client_1.prisma.invoice.create({
            data: {
                hospitalId,
                patientId: data.patientId,
                appointmentId: data.appointmentId,
                invoiceNumber,
                totalAmount,
                discount,
                tax,
                netAmount,
                status: client_2.InvoiceStatus.UNPAID,
                dueDate,
                items: { create: itemsData },
            },
            include: { items: true, patient: true },
        });
    }
    static async recordPayment(hospitalId, data) {
        const invoice = await client_1.prisma.invoice.findUnique({
            where: { id: data.invoiceId },
            include: { payments: true },
        });
        if (!invoice)
            throw { statusCode: 404, message: 'Invoice not found.' };
        const payment = await client_1.prisma.payment.create({
            data: {
                invoiceId: data.invoiceId,
                amount: data.amount,
                method: data.method,
                transactionId: data.transactionId || `TXN-${Date.now()}`,
            },
        });
        const totalPaid = invoice.payments.reduce((acc, p) => acc + Number(p.amount), 0) + Number(data.amount);
        const newStatus = totalPaid >= Number(invoice.netAmount) ? client_2.InvoiceStatus.PAID : client_2.InvoiceStatus.PARTIALLY_PAID;
        await client_1.prisma.invoice.update({
            where: { id: data.invoiceId },
            data: { status: newStatus },
        });
        return payment;
    }
}
exports.BillingService = BillingService;
