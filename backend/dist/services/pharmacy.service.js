"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyService = void 0;
const client_1 = require("../database/client");
class PharmacyService {
    static async listInventory(hospitalId) {
        return client_1.prisma.medicine.findMany({
            where: { hospitalId },
            orderBy: { name: 'asc' },
        });
    }
    static async addMedicine(hospitalId, data) {
        return client_1.prisma.medicine.create({
            data: {
                hospitalId,
                name: data.name,
                genericName: data.genericName,
                category: data.category,
                manufacturer: data.manufacturer,
                unitPrice: data.unitPrice,
                stockQuantity: data.stockQuantity,
                reorderLevel: data.reorderLevel,
                expiryDate: new Date(data.expiryDate),
                batchNumber: data.batchNumber,
                barcode: data.barcode,
            },
        });
    }
    static async listPendingPrescriptions(hospitalId) {
        return client_1.prisma.prescription.findMany({
            where: {
                patient: { hospitalId },
                status: { in: ['PENDING', 'PARTIALLY_DISPENSED'] },
            },
            include: {
                patient: true,
                doctor: { include: { user: true } },
                items: { include: { medicine: true } },
            },
            orderBy: { issuedAt: 'desc' },
        });
    }
    static async dispensePrescription(prescriptionId) {
        const rx = await client_1.prisma.prescription.findUnique({
            where: { id: prescriptionId },
            include: { items: true },
        });
        if (!rx)
            throw { statusCode: 404, message: 'Prescription not found.' };
        // Deduct stock for each item
        for (const item of rx.items) {
            await client_1.prisma.medicine.update({
                where: { id: item.medicineId },
                data: { stockQuantity: { decrement: item.durationDays * 2 } }, // approximate formula
            });
            await client_1.prisma.prescriptionItem.update({
                where: { id: item.id },
                data: { dispensedQty: item.durationDays * 2 },
            });
        }
        return client_1.prisma.prescription.update({
            where: { id: prescriptionId },
            data: { status: 'DISPENSED' },
        });
    }
    static async getLowStockAlerts(hospitalId) {
        const medicines = await client_1.prisma.medicine.findMany({
            where: { hospitalId },
        });
        return medicines.filter((m) => m.stockQuantity <= m.reorderLevel);
    }
}
exports.PharmacyService = PharmacyService;
