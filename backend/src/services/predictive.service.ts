import { prisma } from '../database/client';

export class PredictiveService {
  static async calculateRisks(patientId: string) {
    const models = [
      {
        patientId,
        modelName: 'SEPSIS_RISK',
        riskScore: 14.20,
        riskCategory: 'LOW',
        shapFeatureFactors: { 'WBC Count': '+4%', 'Body Temp': '+2%', 'Heart Rate': '+3%' },
      },
      {
        patientId,
        modelName: '30_DAY_READMISSION_RISK',
        riskScore: 18.50,
        riskCategory: 'LOW',
        shapFeatureFactors: { 'Previous Admissions': '+8%', 'Age': '+5%', 'Comorbidities': '+5.5%' },
      },
      {
        patientId,
        modelName: 'ICU_DETERIORATION_INDEX',
        riskScore: 8.10,
        riskCategory: 'LOW',
        shapFeatureFactors: { SpO2: '-2%', 'Systolic BP': '+3%' },
      },
    ];

    for (const m of models) {
      await prisma.predictiveRiskModel.create({ data: m });
    }

    return prisma.predictiveRiskModel.findMany({
      where: { patientId },
      orderBy: { calculatedAt: 'desc' },
      take: 5,
    });
  }
}
