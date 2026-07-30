import { PrismaClient, UserRole, Gender, AppointmentStatus, AppointmentType, BedStatus, LabTestStatus, PrescriptionStatus, InvoiceStatus, PaymentMethod } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting MedFlow AI Phase 1 Database Seed...');

  // 1. Create Roles
  const roles = Object.values(UserRole);
  for (const roleName of roles) {
    await prisma.role.upsert({
      where: { name: roleName },
      update: {},
      create: { name: roleName, description: `${roleName} Role permissions` },
    });
  }
  console.log('✅ Roles initialized');

  const adminRole = await prisma.role.findUnique({ where: { name: UserRole.ADMIN } });
  const doctorRole = await prisma.role.findUnique({ where: { name: UserRole.DOCTOR } });
  const recepRole = await prisma.role.findUnique({ where: { name: UserRole.RECEPTIONIST } });
  const nurseRole = await prisma.role.findUnique({ where: { name: UserRole.NURSE } });
  const labRole = await prisma.role.findUnique({ where: { name: UserRole.LAB_TECH } });
  const pharmRole = await prisma.role.findUnique({ where: { name: UserRole.PHARMACIST } });
  const patientRole = await prisma.role.findUnique({ where: { name: UserRole.PATIENT } });

  // 2. Create Demo Hospital
  const hospital = await prisma.hospital.upsert({
    where: { code: 'HOSP-001' },
    update: {},
    create: {
      name: 'City Care General Hospital',
      code: 'HOSP-001',
      address: '100 Healthcare Boulevard, Suite 400',
      city: 'Metropolis',
      state: 'NY',
      zipCode: '10001',
      phone: '+1 (555) 019-2831',
      email: 'info@citycarehospital.org',
      licenseNumber: 'LIC-NY-992014',
      taxId: 'TX-88231049',
    },
  });
  console.log(`✅ Demo Hospital created: ${hospital.name}`);

  const defaultPassword = await bcrypt.hash('Password123!', 10);

  // 3. Create Demo Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: adminRole!.id,
      email: 'admin@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'Eleanor',
      lastName: 'Vane',
      phone: '+1 (555) 111-2222',
      isEmailVerified: true,
    },
  });

  // 4. Create Departments
  const cardioDept = await prisma.department.upsert({
    where: { hospitalId_code: { hospitalId: hospital.id, code: 'CARD' } },
    update: {},
    create: { hospitalId: hospital.id, name: 'Cardiology', code: 'CARD', description: 'Heart & Vascular Care' },
  });

  const neuroDept = await prisma.department.upsert({
    where: { hospitalId_code: { hospitalId: hospital.id, code: 'NEUR' } },
    update: {},
    create: { hospitalId: hospital.id, name: 'Neurology', code: 'NEUR', description: 'Brain & Nervous System' },
  });

  const orthoDept = await prisma.department.upsert({
    where: { hospitalId_code: { hospitalId: hospital.id, code: 'ORTH' } },
    update: {},
    create: { hospitalId: hospital.id, name: 'Orthopedics', code: 'ORTH', description: 'Bone & Joint Surgery' },
  });

  // 5. Create Doctor Users & Profiles
  const doc1User = await prisma.user.upsert({
    where: { email: 'doctor@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: doctorRole!.id,
      email: 'doctor@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'Dr. Sarah',
      lastName: 'Jenkins',
      phone: '+1 (555) 222-3333',
      isEmailVerified: true,
    },
  });

  const doctor1 = await prisma.doctor.upsert({
    where: { userId: doc1User.id },
    update: {},
    create: {
      hospitalId: hospital.id,
      userId: doc1User.id,
      departmentId: cardioDept.id,
      specialization: 'Interventional Cardiology',
      qualification: 'MD, FACC',
      licenseNumber: 'DOC-LIC-8821',
      consultationFee: 150.00,
      availability: { mon: ['09:00-13:00', '14:00-17:00'], wed: ['09:00-13:00'] },
    },
  });

  // 6. Create Staff Users (Receptionist, Nurse, Lab Tech, Pharmacist)
  await prisma.user.upsert({
    where: { email: 'receptionist@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: recepRole!.id,
      email: 'receptionist@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'Marcus',
      lastName: 'Wright',
      phone: '+1 (555) 333-4444',
      isEmailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'nurse@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: nurseRole!.id,
      email: 'nurse@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'Clara',
      lastName: 'Oswald',
      phone: '+1 (555) 444-5555',
      isEmailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'labtech@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: labRole!.id,
      email: 'labtech@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'David',
      lastName: 'Banner',
      phone: '+1 (555) 555-6666',
      isEmailVerified: true,
    },
  });

  await prisma.user.upsert({
    where: { email: 'pharmacist@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: pharmRole!.id,
      email: 'pharmacist@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'Rachel',
      lastName: 'Green',
      phone: '+1 (555) 666-7777',
      isEmailVerified: true,
    },
  });

  // 7. Create Demo Patient
  const patientUser = await prisma.user.upsert({
    where: { email: 'patient@medflow.com' },
    update: {},
    create: {
      hospitalId: hospital.id,
      roleId: patientRole!.id,
      email: 'patient@medflow.com',
      passwordHash: defaultPassword,
      firstName: 'Arthur',
      lastName: 'Pendelton',
      phone: '+1 (555) 777-8888',
      isEmailVerified: true,
    },
  });

  const patient = await prisma.patient.upsert({
    where: { hospitalId_mrn: { hospitalId: hospital.id, mrn: 'MRN-2026-0001' } },
    update: {},
    create: {
      hospitalId: hospital.id,
      userId: patientUser.id,
      mrn: 'MRN-2026-0001',
      firstName: 'Arthur',
      lastName: 'Pendelton',
      gender: Gender.MALE,
      dob: new Date('1985-04-12'),
      bloodGroup: 'O+',
      phone: '+1 (555) 777-8888',
      email: 'patient@medflow.com',
      address: '742 Evergreen Terrace, Springfield',
      emergencyContact: 'Martha Pendelton (Spouse)',
      emergencyPhone: '+1 (555) 777-9999',
      allergies: 'Penicillin, Dust Mites',
    },
  });

  // 8. Create Vitals Record
  await prisma.vital.create({
    data: {
      patientId: patient.id,
      systolicBp: 120,
      diastolicBp: 80,
      heartRate: 72,
      temperature: 36.8,
      spO2: 98,
      respiratoryRate: 16,
      weight: 78.5,
      height: 178.0,
    },
  });

  // 9. Create Wards & Beds
  const icuWard = await prisma.ward.create({
    data: {
      hospitalId: hospital.id,
      name: 'Intensive Care Unit (ICU)',
      type: 'ICU',
      capacity: 10,
    },
  });

  const bed1 = await prisma.bed.create({
    data: {
      hospitalId: hospital.id,
      wardId: icuWard.id,
      bedNumber: 'ICU-101',
      status: BedStatus.OCCUPIED,
      dailyCharge: 500.00,
    },
  });

  await prisma.bed.create({
    data: {
      hospitalId: hospital.id,
      wardId: icuWard.id,
      bedNumber: 'ICU-102',
      status: BedStatus.AVAILABLE,
      dailyCharge: 500.00,
    },
  });

  // 10. Create Admission
  await prisma.admission.create({
    data: {
      hospitalId: hospital.id,
      patientId: patient.id,
      bedId: bed1.id,
      doctorId: doctor1.id,
      status: 'ADMITTED',
      admittedAt: new Date(),
    },
  });

  // 11. Create Pharmacy Medicines & Stock
  const med1 = await prisma.medicine.create({
    data: {
      hospitalId: hospital.id,
      name: 'Amoxicillin 500mg',
      genericName: 'Amoxicillin',
      category: 'Capsule',
      manufacturer: 'Pfizer',
      unitPrice: 12.50,
      stockQuantity: 450,
      reorderLevel: 50,
      expiryDate: new Date('2027-12-31'),
      batchNumber: 'BATCH-AMX-2026',
      barcode: '8901234567890',
    },
  });

  const med2 = await prisma.medicine.create({
    data: {
      hospitalId: hospital.id,
      name: 'Atorvastatin 20mg',
      genericName: 'Atorvastatin',
      category: 'Tablet',
      manufacturer: 'Novartis',
      unitPrice: 18.00,
      stockQuantity: 15, // Low stock alert demo
      reorderLevel: 30,
      expiryDate: new Date('2027-08-30'),
      batchNumber: 'BATCH-ATV-2026',
      barcode: '8901234567891',
    },
  });

  // 12. Create Master Lab Tests
  const labTest1 = await prisma.labTest.create({
    data: {
      hospitalId: hospital.id,
      name: 'Complete Blood Count (CBC)',
      code: 'LAB-CBC-01',
      category: 'Hematology',
      price: 45.00,
      normalRange: 'WBC: 4.5-11.0, RBC: 4.3-5.9',
      unit: 'x10^3 / µL',
    },
  });

  await prisma.labTest.create({
    data: {
      hospitalId: hospital.id,
      name: 'Lipid Panel',
      code: 'LAB-LIPID-02',
      category: 'Biochemistry',
      price: 65.00,
      normalRange: 'Cholesterol < 200 mg/dL',
      unit: 'mg/dL',
    },
  });

  // 13. Create Appointment & Consultation Workflow
  const appointment = await prisma.appointment.create({
    data: {
      hospitalId: hospital.id,
      patientId: patient.id,
      doctorId: doctor1.id,
      appointmentDate: new Date(),
      tokenNumber: 1,
      status: AppointmentStatus.IN_CONSULTATION,
      type: AppointmentType.WALK_IN,
      reason: 'Routine Cardiology Follow-up & Chest Tightness Check',
    },
  });

  // 14. Create Diagnosis & SOAP Notes
  await prisma.diagnosis.create({
    data: {
      appointmentId: appointment.id,
      doctorId: doctor1.id,
      icdCode: 'I20.9',
      symptoms: 'Mild precordial discomfort during exertion, shortness of breath',
      subjective: 'Patient reports intermittent chest heaviness past 3 days when climbing stairs.',
      objective: 'BP 120/80 mmHg, HR 72 bpm, S1/S2 normal, no murmur.',
      assessment: 'Suspected stable angina pectoris. Rule out coronary ischemia.',
      plan: 'Order CBC & Lipid profile. Start Atorvastatin 20mg nocte and Amoxicillin prophylaxis.',
      clinicalNotes: 'Follow up in 7 days after lab reports.',
    },
  });

  // 15. Create Prescription
  const prescription = await prisma.prescription.create({
    data: {
      appointmentId: appointment.id,
      patientId: patient.id,
      doctorId: doctor1.id,
      status: PrescriptionStatus.PENDING,
      notes: 'Take medicines after food with plenty of water.',
      items: {
        create: [
          {
            medicineId: med1.id,
            dosage: '500mg',
            frequency: '1-0-1',
            durationDays: 5,
            instructions: 'Take oral tablet after meals',
          },
          {
            medicineId: med2.id,
            dosage: '20mg',
            frequency: '0-0-1',
            durationDays: 30,
            instructions: 'Take before bed',
          },
        ],
      },
    },
  });

  // 16. Create Lab Report Request
  await prisma.labReport.create({
    data: {
      patientId: patient.id,
      labTestId: labTest1.id,
      status: LabTestStatus.PENDING,
      requestedAt: new Date(),
    },
  });

  // 17. Create Invoice & Payment Record
  const invoice = await prisma.invoice.create({
    data: {
      hospitalId: hospital.id,
      patientId: patient.id,
      appointmentId: appointment.id,
      invoiceNumber: 'INV-2026-00891',
      totalAmount: 195.00,
      discount: 0,
      tax: 9.75,
      netAmount: 204.75,
      status: InvoiceStatus.PAID,
      dueDate: new Date(),
      items: {
        create: [
          { description: 'Cardiology Consultation Fee', quantity: 1, unitPrice: 150.00, totalPrice: 150.00 },
          { description: 'Complete Blood Count (CBC) Test', quantity: 1, unitPrice: 45.00, totalPrice: 45.00 },
        ],
      },
    },
  });

  await prisma.payment.create({
    data: {
      invoiceId: invoice.id,
      amount: 204.75,
      method: PaymentMethod.CARD,
      transactionId: 'TXN-PAY-9988210',
    },
  });

  // 18. Audit Log Initial Seed Entry
  await prisma.auditLog.create({
    data: {
      hospitalId: hospital.id,
      userId: adminUser.id,
      action: 'SYSTEM_BOOTSTRAP',
      module: 'SYSTEM',
      ipAddress: '127.0.0.1',
      details: { message: 'MedFlow AI Phase 1 hospital initial setup completed successfully.' },
    },
  });

  console.log('✅ MedFlow AI Database Seeding Finished Successfully!');
  console.log('\n--- DEMO USER CREDENTIALS ---');
  console.log('Admin:       admin@medflow.com / Password123!');
  console.log('Doctor:      doctor@medflow.com / Password123!');
  console.log('Reception:   receptionist@medflow.com / Password123!');
  console.log('Nurse:       nurse@medflow.com / Password123!');
  console.log('Lab Tech:    labtech@medflow.com / Password123!');
  console.log('Pharmacist:  pharmacist@medflow.com / Password123!');
  console.log('Patient:     patient@medflow.com / Password123!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
