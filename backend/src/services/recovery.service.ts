import { prisma } from '../database/client';

export class RecoveryService {
  static async logRecovery(patientId: string, data: any) {
    return prisma.recoveryLog.create({
      data: {
        patientId,
        painScore: data.painScore,
        moodScore: data.moodScore,
        sleepHours: data.sleepHours,
        waterIntakeMl: data.waterIntakeMl,
        exercisesDone: data.exercisesDone,
        doctorNotes: data.doctorNotes,
      },
    });
  }

  static async getRecoveryHistory(patientId: string) {
    return prisma.recoveryLog.findMany({
      where: { patientId },
      orderBy: { createdAt: 'desc' },
      take: 14,
    });
  }

  static async logAdherence(patientId: string, medicineName: string, isTaken: boolean) {
    return prisma.medicationAdherence.create({
      data: {
        patientId,
        medicineName,
        scheduledTime: new Date(),
        takenTime: isTaken ? new Date() : null,
        isTaken,
        isMissed: !isTaken,
      },
    });
  }
}
