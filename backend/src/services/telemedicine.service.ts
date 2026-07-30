import { prisma } from '../database/client';
import { TelemedicineStatus } from '@prisma/client';

export class TelemedicineService {
  static async createOrGetSession(hospitalId: string, appointmentId: string, patientId: string, doctorId: string) {
    const existing = await prisma.telemedicineSession.findUnique({
      where: { appointmentId },
      include: { patient: true, doctor: { include: { user: true } } },
    });

    if (existing) return existing;

    const roomName = `ROOM-TELE-${appointmentId.substring(0, 8).toUpperCase()}`;

    return prisma.telemedicineSession.create({
      data: {
        hospitalId,
        appointmentId,
        patientId,
        doctorId,
        roomName,
        status: TelemedicineStatus.WAITING_ROOM,
        queuePosition: 1,
      },
      include: { patient: true, doctor: { include: { user: true } } },
    });
  }

  static async updateStatus(sessionId: string, status: TelemedicineStatus) {
    return prisma.telemedicineSession.update({
      where: { id: sessionId },
      data: {
        status,
        ...(status === 'IN_CALL' ? { startedAt: new Date() } : {}),
        ...(status === 'COMPLETED' ? { endedAt: new Date() } : {}),
      },
    });
  }
}
