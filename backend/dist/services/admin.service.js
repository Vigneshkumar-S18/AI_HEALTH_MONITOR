"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const client_1 = require("../database/client");
class AdminService {
    static async getDashboardStats(hospitalId) {
        const totalPatients = await client_1.prisma.patient.count({ where: { hospitalId } });
        const totalDoctors = await client_1.prisma.doctor.count({ where: { hospitalId } });
        const totalAppointments = await client_1.prisma.appointment.count({ where: { hospitalId } });
        const totalBeds = await client_1.prisma.bed.count({ where: { hospitalId } });
        const occupiedBeds = await client_1.prisma.bed.count({ where: { hospitalId, status: 'OCCUPIED' } });
        const bedOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
        const invoices = await client_1.prisma.invoice.findMany({
            where: { hospitalId, status: 'PAID' },
            select: { netAmount: true },
        });
        const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.netAmount), 0);
        const recentAppointments = await client_1.prisma.appointment.findMany({
            where: { hospitalId },
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { patient: true, doctor: { include: { user: true } } },
        });
        const recentAuditLogs = await client_1.prisma.auditLog.findMany({
            where: { hospitalId },
            take: 10,
            orderBy: { createdAt: 'desc' },
            include: { user: true },
        });
        return {
            totalPatients,
            totalDoctors,
            totalAppointments,
            totalBeds,
            occupiedBeds,
            bedOccupancyRate,
            totalRevenue,
            recentAppointments,
            recentAuditLogs,
        };
    }
    static async listWardsAndBeds(hospitalId) {
        return client_1.prisma.ward.findMany({
            where: { hospitalId },
            include: {
                beds: {
                    include: {
                        admissions: {
                            where: { status: 'ADMITTED' },
                            include: { patient: true, doctor: { include: { user: true } } },
                        },
                    },
                },
            },
        });
    }
    static async listAuditLogs(hospitalId) {
        return client_1.prisma.auditLog.findMany({
            where: { hospitalId },
            include: { user: true },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
    }
}
exports.AdminService = AdminService;
