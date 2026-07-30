"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemedicineService = void 0;
const client_1 = require("../database/client");
const client_2 = require("@prisma/client");
class TelemedicineService {
    static async createOrGetSession(hospitalId, appointmentId, patientId, doctorId) {
        const existing = await client_1.prisma.telemedicineSession.findUnique({
            where: { appointmentId },
            include: { patient: true, doctor: { include: { user: true } } },
        });
        if (existing)
            return existing;
        const roomName = `ROOM-TELE-${appointmentId.substring(0, 8).toUpperCase()}`;
        return client_1.prisma.telemedicineSession.create({
            data: {
                hospitalId,
                appointmentId,
                patientId,
                doctorId,
                roomName,
                status: client_2.TelemedicineStatus.WAITING_ROOM,
                queuePosition: 1,
            },
            include: { patient: true, doctor: { include: { user: true } } },
        });
    }
    static async updateStatus(sessionId, status) {
        return client_1.prisma.telemedicineSession.update({
            where: { id: sessionId },
            data: {
                status,
                ...(status === 'IN_CALL' ? { startedAt: new Date() } : {}),
                ...(status === 'COMPLETED' ? { endedAt: new Date() } : {}),
            },
        });
    }
}
exports.TelemedicineService = TelemedicineService;
