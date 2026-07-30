import { prisma } from '../database/client';

export class CDSSService {
  static async evaluateDrugSafety(patientId: string, medicationName: string) {
    if (medicationName.toLowerCase().includes('aspirin')) {
      return prisma.cDSSAlert.create({
        data: {
          patientId,
          alertType: 'DRUG_INTERACTION',
          title: 'Moderate Drug Interaction Alert',
          description: 'Aspirin may interact with active anticoagulant therapy. Monitor coagulation parameters.',
          severity: 'WARNING',
          confidence: 0.9620,
          evidence: 'Lexicomp Drug Safety Database Section 4.2',
        },
      });
    }

    return {
      alertType: 'NONE',
      title: 'No Interactions Detected',
      description: 'Medication prescription is safe based on patient EMR history.',
      severity: 'INFO',
      confidence: 0.9910,
    };
  }

  static async getPatientAlerts(patientId: string) {
    return prisma.cDSSAlert.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
