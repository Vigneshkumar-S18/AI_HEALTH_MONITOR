import { prisma } from '../database/client';

export class PharmacyService {
  static async listInventory(hospitalId: string) {
    return prisma.medicine.findMany({
      where: { hospitalId },
      orderBy: { name: 'asc' },
    });
  }

  static async addMedicine(hospitalId: string, data: any) {
    return prisma.medicine.create({
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

  static async listPendingPrescriptions(hospitalId: string) {
    return prisma.prescription.findMany({
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

  static async dispensePrescription(prescriptionId: string) {
    const rx = await prisma.prescription.findUnique({
      where: { id: prescriptionId },
      include: { items: true },
    });

    if (!rx) throw { statusCode: 404, message: 'Prescription not found.' };

    // Deduct stock for each item
    for (const item of rx.items) {
      await prisma.medicine.update({
        where: { id: item.medicineId },
        data: { stockQuantity: { decrement: item.durationDays * 2 } }, // approximate formula
      });

      await prisma.prescriptionItem.update({
        where: { id: item.id },
        data: { dispensedQty: item.durationDays * 2 },
      });
    }

    return prisma.prescription.update({
      where: { id: prescriptionId },
      data: { status: 'DISPENSED' },
    });
  }

  static async getLowStockAlerts(hospitalId: string) {
    const medicines = await prisma.medicine.findMany({
      where: { hospitalId },
    });
    return medicines.filter((m) => m.stockQuantity <= m.reorderLevel);
  }
}
