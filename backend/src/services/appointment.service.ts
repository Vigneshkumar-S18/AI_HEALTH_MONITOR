import { prisma } from '../database/client';
import { AppointmentStatus } from '@prisma/client';

export class AppointmentService {
  static async listAppointments(hospitalId: string, doctorId?: string, status?: AppointmentStatus) {
    return prisma.appointment.findMany({
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

  static async bookAppointment(hospitalId: string, data: any) {
    const apptDate = new Date(data.appointmentDate);

    // Calculate token number for the doctor on that day
    const startOfDay = new Date(apptDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(apptDate);
    endOfDay.setHours(23, 59, 59, 999);

    const existingCount = await prisma.appointment.count({
      where: {
        hospitalId,
        doctorId: data.doctorId,
        appointmentDate: { gte: startOfDay, lte: endOfDay },
      },
    });

    const tokenNumber = existingCount + 1;

    return prisma.appointment.create({
      data: {
        hospitalId,
        patientId: data.patientId,
        doctorId: data.doctorId,
        appointmentDate: apptDate,
        tokenNumber,
        type: data.type,
        reason: data.reason,
        status: AppointmentStatus.SCHEDULED,
      },
      include: {
        patient: true,
        doctor: { include: { user: true } },
      },
    });
  }

  static async updateStatus(hospitalId: string, appointmentId: string, status: AppointmentStatus) {
    return prisma.appointment.update({
      where: { id: appointmentId },
      data: { status },
    });
  }
}
