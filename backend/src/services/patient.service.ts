import { prisma } from '../database/client';

export class PatientService {
  static async listPatients(hospitalId: string, search?: string) {
    return prisma.patient.findMany({
      where: {
        hospitalId,
        ...(search
          ? {
              OR: [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { mrn: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
              ],
            }
          : {}),
      },
      include: {
        vitals: { orderBy: { recordedAt: 'desc' }, take: 1 },
        admissions: { where: { status: 'ADMITTED' }, include: { bed: { include: { ward: true } } } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async getPatientById(hospitalId: string, id: string) {
    const patient = await prisma.patient.findFirst({
      where: { id, hospitalId },
      include: {
        vitals: { orderBy: { recordedAt: 'desc' } },
        medicalHistory: { orderBy: { createdAt: 'desc' } },
        appointments: { include: { doctor: { include: { user: true } }, diagnosis: true }, orderBy: { appointmentDate: 'desc' } },
        prescriptions: { include: { doctor: { include: { user: true } }, items: { include: { medicine: true } } }, orderBy: { issuedAt: 'desc' } },
        labReports: { include: { labTest: true }, orderBy: { requestedAt: 'desc' } },
        admissions: { include: { bed: { include: { ward: true } }, doctor: { include: { user: true } } } },
        invoices: { include: { items: true }, orderBy: { createdAt: 'desc' } },
      },
    });

    if (!patient) throw { statusCode: 404, message: 'Patient record not found.' };
    return patient;
  }

  static async registerPatient(hospitalId: string, data: any) {
    // Generate unique MRN
    const count = await prisma.patient.count({ where: { hospitalId } });
    const mrn = `MRN-${new Date().getFullYear()}-${(count + 1).toString().padStart(4, '0')}`;

    return prisma.patient.create({
      data: {
        hospitalId,
        mrn,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        dob: new Date(data.dob),
        bloodGroup: data.bloodGroup,
        phone: data.phone,
        email: data.email,
        address: data.address,
        emergencyContact: data.emergencyContact,
        emergencyPhone: data.emergencyPhone,
        allergies: data.allergies,
      },
    });
  }

  static async recordVitals(patientId: string, recordedByUserId: string, data: any) {
    return prisma.vital.create({
      data: {
        patientId,
        systolicBp: data.systolicBp,
        diastolicBp: data.diastolicBp,
        heartRate: data.heartRate,
        temperature: data.temperature,
        spO2: data.spO2,
        respiratoryRate: data.respiratoryRate,
        weight: data.weight,
        height: data.height,
        recordedByUserId,
      },
    });
  }
}
