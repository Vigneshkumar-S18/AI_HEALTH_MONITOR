"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabService = void 0;
const client_1 = require("../database/client");
const client_2 = require("@prisma/client");
class LabService {
    static async listLabTests(hospitalId) {
        return client_1.prisma.labTest.findMany({
            where: { hospitalId },
            orderBy: { name: 'asc' },
        });
    }
    static async orderLabTest(patientId, labTestId) {
        return client_1.prisma.labReport.create({
            data: {
                patientId,
                labTestId,
                status: client_2.LabTestStatus.PENDING,
            },
            include: { patient: true, labTest: true },
        });
    }
    static async listPendingOrders(hospitalId) {
        return client_1.prisma.labReport.findMany({
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
    static async submitResult(labReportId, data) {
        return client_1.prisma.labReport.update({
            where: { id: labReportId },
            data: {
                resultValue: data.resultValue,
                resultNotes: data.resultNotes,
                technicianName: data.technicianName || 'Lab Tech',
                status: client_2.LabTestStatus.COMPLETED,
                completedAt: new Date(),
            },
            include: { patient: true, labTest: true },
        });
    }
}
exports.LabService = LabService;
