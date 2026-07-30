import { prisma } from '../database/client';

export class WearableService {
  static async syncMetrics(patientId: string, data: any) {
    return prisma.wearableMetric.create({
      data: {
        patientId,
        provider: data.provider || 'Apple Health',
        steps: data.steps || 0,
        restingHeartRate: data.restingHeartRate || 70,
        sleepMinutes: data.sleepMinutes || 480,
        caloriesBurned: data.caloriesBurned || 2100,
        spO2Avg: data.spO2Avg || 98,
      },
    });
  }

  static async getLatestMetrics(patientId: string) {
    return prisma.wearableMetric.findMany({
      where: { patientId },
      orderBy: { syncedAt: 'desc' },
      take: 7,
    });
  }
}
