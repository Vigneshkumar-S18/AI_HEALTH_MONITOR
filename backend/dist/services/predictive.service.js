"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictiveService = void 0;
const client_1 = require("../database/client");
class PredictiveService {
    static async calculateRisks(patientId) {
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
            await client_1.prisma.predictiveRiskModel.create({ data: m });
        }
        return client_1.prisma.predictiveRiskModel.findMany({
            where: { patientId },
            orderBy: { calculatedAt: 'desc' },
            take: 5,
        });
    }
}
exports.PredictiveService = PredictiveService;
