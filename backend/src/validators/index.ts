import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const patientRegistrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  dob: z.string(),
  bloodGroup: z.string().optional(),
  phone: z.string().min(5, 'Phone number is required'),
  email: z.string().email().optional().or(z.literal('')),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  allergies: z.string().optional(),
});

export const vitalsSchema = z.object({
  patientId: z.string().uuid(),
  systolicBp: z.number().optional(),
  diastolicBp: z.number().optional(),
  heartRate: z.number().optional(),
  temperature: z.number().optional(),
  spO2: z.number().optional(),
  respiratoryRate: z.number().optional(),
  weight: z.number().optional(),
  height: z.number().optional(),
});

export const appointmentBookingSchema = z.object({
  patientId: z.string().uuid(),
  doctorId: z.string().uuid(),
  appointmentDate: z.string(),
  type: z.enum(['WALK_IN', 'ONLINE', 'EMERGENCY', 'FOLLOW_UP']),
  reason: z.string().optional(),
});

export const diagnosisSchema = z.object({
  appointmentId: z.string().uuid(),
  icdCode: z.string().optional(),
  symptoms: z.string().min(1, 'Symptoms are required'),
  subjective: z.string().optional(),
  objective: z.string().optional(),
  assessment: z.string().optional(),
  plan: z.string().optional(),
  clinicalNotes: z.string().optional(),
});

export const prescriptionSchema = z.object({
  appointmentId: z.string().uuid().optional(),
  patientId: z.string().uuid(),
  notes: z.string().optional(),
  items: z.array(
    z.object({
      medicineId: z.string().uuid(),
      dosage: z.string(),
      frequency: z.string(),
      durationDays: z.number().int().positive(),
      instructions: z.string().optional(),
    })
  ),
});

export const medicineInventorySchema = z.object({
  name: z.string().min(1, 'Medicine name is required'),
  genericName: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  manufacturer: z.string().optional(),
  unitPrice: z.number().positive(),
  stockQuantity: z.number().int().nonnegative(),
  reorderLevel: z.number().int().nonnegative(),
  expiryDate: z.string(),
  batchNumber: z.string().min(1, 'Batch number is required'),
  barcode: z.string().optional(),
});

export const labReportResultSchema = z.object({
  labReportId: z.string().uuid(),
  resultValue: z.string().min(1, 'Result value is required'),
  resultNotes: z.string().optional(),
  technicianName: z.string().optional(),
});

export const admissionSchema = z.object({
  patientId: z.string().uuid(),
  bedId: z.string().uuid(),
  doctorId: z.string().uuid(),
});

export const invoiceSchema = z.object({
  patientId: z.string().uuid(),
  appointmentId: z.string().uuid().optional(),
  discount: z.number().default(0),
  tax: z.number().default(0),
  items: z.array(
    z.object({
      description: z.string(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().positive(),
    })
  ),
});

export const paymentSchema = z.object({
  invoiceId: z.string().uuid(),
  amount: z.number().positive(),
  method: z.enum(['CASH', 'CARD', 'UPI', 'INSURANCE', 'BANK_TRANSFER']),
  transactionId: z.string().optional(),
});
