"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WearableService = void 0;
const client_1 = require("../database/client");
class WearableService {
    static async syncMetrics(patientId, data) {
        return client_1.prisma.wearableMetric.create({
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
    static async getLatestMetrics(patientId) {
        return client_1.prisma.wearableMetric.findMany({
            where: { patientId },
            orderBy: { syncedAt: 'desc' },
            take: 7,
        });
    }
}
exports.WearableService = WearableService;
