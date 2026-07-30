import { prisma } from '../database/client';
import { LabTestStatus } from '@prisma/client';

export class LabService {
  static async listLabTests(hospitalId: string) {
    return prisma.labTest.findMany({
      where: { hospitalId },
      orderBy: { name: 'asc' },
    });
  }

  static async orderLabTest(patientId: string, labTestId: string) {
    return prisma.labReport.create({
      data: {
        patientId,
        labTestId,
        status: LabTestStatus.PENDING,
      },
      include: { patient: true, labTest: true },
    });
  }

  static async listPendingOrders(hospitalId: string) {
    return prisma.labReport.findMany({
      where: {
        patient: { hospitalId },
        status: { in: ['PENDING', 'SAMPLE_COLLECTED', 'IN_PROGRESS'] },
      },
      include: {
        patient: true,
        labTest: true,
      },
      orderBy: { requestedAt: 'desc' },
    });
  }

  static async submitResult(labReportId: string, data: any) {
    return prisma.labReport.update({
      where: { id: labReportId },
      data: {
        resultValue: data.resultValue,
        resultNotes: data.resultNotes,
        technicianName: data.technicianName || 'Lab Tech',
        status: LabTestStatus.COMPLETED,
        completedAt: new Date(),
      },
      include: { patient: true, labTest: true },
    });
  }
}
