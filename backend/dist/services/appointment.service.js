"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentService = void 0;
const client_1 = require("../database/client");
const client_2 = require("@prisma/client");
class AppointmentService {
    static async listAppointments(hospitalId, doctorId, status) {
        return client_1.prisma.appointment.findMany({
            where: {
                hospitalId,
                ...(doctorId ? { doctorId } : {}),
                ...(status ? { status } : {}),
            },
            include: {
                patient: true,
                doctor: { include: { user: true, department: true } },
                diagnosis: true,
                prescription: true,
            },
            orderBy: { appointmentDate: 'desc' },
        });
    }
    static async bookAppointment(hospitalId, data) {
        const apptDate = new Date(data.appointmentDate);
        // Calculate token number for the doctor on that day
        const startOfDay = new Date(apptDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(apptDate);
        endOfDay.setHours(23, 59, 59, 999);
        const existingCount = await client_1.prisma.appointment.count({
            where: {
                hospitalId,
                doctorId: data.doctorId,
                appointmentDate: { gte: startOfDay, lte: endOfDay },
            },
        });
        const tokenNumber = existingCount + 1;
        return client_1.prisma.appointment.create({
            data: {
                hospitalId,
                patientId: data.patientId,
                doctorId: data.doctorId,
                appointmentDate: apptDate,
                tokenNumber,
                type: data.type,
                reason: data.reason,
                status: client_2.AppointmentStatus.SCHEDULED,
            },
            include: {
                patient: true,
                doctor: { include: { user: true } },
            },
        });
    }
    static async updateStatus(hospitalId, appointmentId, status) {
        return client_1.prisma.appointment.update({
            where: { id: appointmentId },
            data: { status },
        });
    }
}
exports.AppointmentService = AppointmentService;
