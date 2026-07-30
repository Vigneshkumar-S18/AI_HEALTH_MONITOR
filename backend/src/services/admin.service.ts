import { prisma } from '../database/client';

export class AdminService {
  static async getDashboardStats(hospitalId: string) {
    const totalPatients = await prisma.patient.count({ where: { hospitalId } });
    const totalDoctors = await prisma.doctor.count({ where: { hospitalId } });
    const totalAppointments = await prisma.appointment.count({ where: { hospitalId } });

    const totalBeds = await prisma.bed.count({ where: { hospitalId } });
    const occupiedBeds = await prisma.bed.count({ where: { hospitalId, status: 'OCCUPIED' } });
    const bedOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    const invoices = await prisma.invoice.findMany({
      where: { hospitalId, status: 'PAID' },
      select: { netAmount: true },
    });
    const totalRevenue = invoices.reduce((sum, inv) => sum + Number(inv.netAmount), 0);

    const recentAppointments = await prisma.appointment.findMany({
      where: { hospitalId },
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { patient: true, doctor: { include: { user: true } } },
    });

    const recentAuditLogs = await prisma.auditLog.findMany({
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

  static async listWardsAndBeds(hospitalId: string) {
    return prisma.ward.findMany({
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

  static async listAuditLogs(hospitalId: string) {
    return prisma.auditLog.findMany({
      where: { hospitalId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
