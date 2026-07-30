import { prisma } from '../database/client';

export class DoctorService {
  static async listDoctors(hospitalId: string) {
    return prisma.doctor.findMany({
      where: { hospitalId },
      include: {
        user: { select: { firstName: true, lastName: true, email: true, phone: true, avatarUrl: true } },
        department: true,
      },
    });
  }

  static async getDoctorQueue(hospitalId: string, doctorUserId: string) {
    const doctor = await prisma.doctor.findUnique({ where: { userId: doctorUserId } });
    if (!doctor) throw { statusCode: 404, message: 'Doctor record not found.' };

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    return prisma.appointment.findMany({
      where: {
        hospitalId,
        doctorId: doctor.id,
        appointmentDate: { gte: todayStart, lte: todayEnd },
      },
      include: {
        patient: {
          include: {
            vitals: { orderBy: { recordedAt: 'desc' }, take: 1 },
          },
        },
        diagnosis: true,
        prescription: { include: { items: { include: { medicine: true } } } },
      },
      orderBy: { tokenNumber: 'asc' },
    });
  }

  static async saveDiagnosis(doctorId: string, data: any) {
    return prisma.diagnosis.upsert({
      where: { appointmentId: data.appointmentId },
      update: {
        icdCode: data.icdCode,
        symptoms: data.symptoms,
        subjective: data.subjective,
        objective: data.objective,
        assessment: data.assessment,
        plan: data.plan,
        clinicalNotes: data.clinicalNotes,
      },
      create: {
        appointmentId: data.appointmentId,
        doctorId,
        icdCode: data.icdCode,
        symptoms: data.symptoms,
        subjective: data.subjective,
        objective: data.objective,
        assessment: data.assessment,
        plan: data.plan,
        clinicalNotes: data.clinicalNotes,
      },
    });
  }

  static async createPrescription(doctorId: string, data: any) {
    return prisma.prescription.create({
      data: {
        appointmentId: data.appointmentId,
        patientId: data.patientId,
        doctorId,
        notes: data.notes,
        items: {
          create: data.items.map((item: any) => ({
            medicineId: item.medicineId,
            dosage: item.dosage,
            frequency: item.frequency,
            durationDays: item.durationDays,
            instructions: item.instructions,
          })),
        },
      },
      include: { items: { include: { medicine: true } } },
    });
  }
}
