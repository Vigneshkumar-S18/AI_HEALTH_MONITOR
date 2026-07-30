"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryService = void 0;
const client_1 = require("../database/client");
class RecoveryService {
    static async logRecovery(patientId, data) {
        return client_1.prisma.recoveryLog.create({
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
    static async getRecoveryHistory(patientId) {
        return client_1.prisma.recoveryLog.findMany({
            where: { patientId },
            orderBy: { createdAt: 'desc' },
            take: 14,
        });
    }
    static async logAdherence(patientId, medicineName, isTaken) {
        return client_1.prisma.medicationAdherence.create({
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
exports.RecoveryService = RecoveryService;
