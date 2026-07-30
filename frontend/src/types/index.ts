export type UserRole =
  | 'ADMIN'
  | 'DOCTOR'
  | 'RECEPTIONIST'
  | 'NURSE'
  | 'LAB_TECH'
  | 'PHARMACIST'
  | 'PATIENT';

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  hospitalId: string;
  avatarUrl?: string;
}

export interface Hospital {
  id: string;
  name: string;
  code: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Patient {
  id: string;
  mrn: string;
  firstName: string;
  lastName: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  dob: string;
  bloodGroup?: string;
  phone: string;
  email?: string;
  address?: string;
  allergies?: string;
  vitals?: Vital[];
  admissions?: Admission[];
}

export interface Vital {
  id: string;
  systolicBp?: number;
  diastolicBp?: number;
  heartRate?: number;
  temperature?: number;
  spO2?: number;
  respiratoryRate?: number;
  weight?: number;
  height?: number;
  recordedAt: string;
}

export interface Doctor {
  id: string;
  specialization: string;
  qualification: string;
  consultationFee: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
  };
  department?: {
    name: string;
    code: string;
  };
}

export interface Appointment {
  id: string;
  tokenNumber: number;
  appointmentDate: string;
  status: 'SCHEDULED' | 'CHECKED_IN' | 'IN_CONSULTATION' | 'COMPLETED' | 'CANCELLED';
  type: 'WALK_IN' | 'ONLINE' | 'EMERGENCY' | 'FOLLOW_UP';
  reason?: string;
  patient: Patient;
  doctor: Doctor;
  diagnosis?: Diagnosis;
  prescription?: Prescription;
}

export interface Diagnosis {
  id: string;
  icdCode?: string;
  symptoms: string;
  subjective?: string;
  objective?: string;
  assessment?: string;
  plan?: string;
  clinicalNotes?: string;
}

export interface Prescription {
  id: string;
  status: 'PENDING' | 'PARTIALLY_DISPENSED' | 'DISPENSED' | 'CANCELLED';
  notes?: string;
  issuedAt: string;
  patient?: Patient;
  doctor?: Doctor;
  items: {
    id: string;
    dosage: string;
    frequency: string;
    durationDays: number;
    instructions?: string;
    medicine: {
      id: string;
      name: string;
      unitPrice: number;
    };
  }[];
}

export interface Medicine {
  id: string;
  name: string;
  genericName?: string;
  category: string;
  manufacturer?: string;
  unitPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  expiryDate: string;
  batchNumber: string;
  barcode?: string;
}

export interface LabTest {
  id: string;
  name: string;
  code: string;
  category: string;
  price: number;
  normalRange?: string;
  unit?: string;
}

export interface LabReport {
  id: string;
  status: 'PENDING' | 'SAMPLE_COLLECTED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  resultValue?: string;
  resultNotes?: string;
  technicianName?: string;
  requestedAt: string;
  completedAt?: string;
  patient: Patient;
  labTest: LabTest;
}

export interface Ward {
  id: string;
  name: string;
  type: string;
  capacity: number;
  beds: Bed[];
}

export interface Bed {
  id: string;
  bedNumber: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE' | 'RESERVED';
  dailyCharge: number;
  admissions?: Admission[];
}

export interface Admission {
  id: string;
  status: 'ADMITTED' | 'DISCHARGED' | 'TRANSFERRED' | 'CRITICAL';
  admittedAt: string;
  patient: Patient;
  bed?: Bed;
  doctor?: Doctor;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  discount: number;
  tax: number;
  netAmount: number;
  status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID' | 'CANCELLED';
  dueDate: string;
  createdAt: string;
  patient: Patient;
  items: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
}

export interface AuditLog {
  id: string;
  action: string;
  module: string;
  ipAddress?: string;
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
}
