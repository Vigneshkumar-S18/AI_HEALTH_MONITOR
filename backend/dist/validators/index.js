"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentSchema = exports.invoiceSchema = exports.admissionSchema = exports.labReportResultSchema = exports.medicineInventorySchema = exports.prescriptionSchema = exports.diagnosisSchema = exports.appointmentBookingSchema = exports.vitalsSchema = exports.patientRegistrationSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address format'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
exports.patientRegistrationSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(1, 'First name is required'),
    lastName: zod_1.z.string().min(1, 'Last name is required'),
    gender: zod_1.z.enum(['MALE', 'FEMALE', 'OTHER']),
    dob: zod_1.z.string(),
    bloodGroup: zod_1.z.string().optional(),
    phone: zod_1.z.string().min(5, 'Phone number is required'),
    email: zod_1.z.string().email().optional().or(zod_1.z.literal('')),
    address: zod_1.z.string().optional(),
    emergencyContact: zod_1.z.string().optional(),
    emergencyPhone: zod_1.z.string().optional(),
    allergies: zod_1.z.string().optional(),
});
exports.vitalsSchema = zod_1.z.object({
    patientId: zod_1.z.string().uuid(),
    systolicBp: zod_1.z.number().optional(),
    diastolicBp: zod_1.z.number().optional(),
    heartRate: zod_1.z.number().optional(),
    temperature: zod_1.z.number().optional(),
    spO2: zod_1.z.number().optional(),
    respiratoryRate: zod_1.z.number().optional(),
    weight: zod_1.z.number().optional(),
    height: zod_1.z.number().optional(),
});
exports.appointmentBookingSchema = zod_1.z.object({
    patientId: zod_1.z.string().uuid(),
    doctorId: zod_1.z.string().uuid(),
    appointmentDate: zod_1.z.string(),
    type: zod_1.z.enum(['WALK_IN', 'ONLINE', 'EMERGENCY', 'FOLLOW_UP']),
    reason: zod_1.z.string().optional(),
});
exports.diagnosisSchema = zod_1.z.object({
    appointmentId: zod_1.z.string().uuid(),
    icdCode: zod_1.z.string().optional(),
    symptoms: zod_1.z.string().min(1, 'Symptoms are required'),
    subjective: zod_1.z.string().optional(),
    objective: zod_1.z.string().optional(),
    assessment: zod_1.z.string().optional(),
    plan: zod_1.z.string().optional(),
    clinicalNotes: zod_1.z.string().optional(),
});
exports.prescriptionSchema = zod_1.z.object({
    appointmentId: zod_1.z.string().uuid().optional(),
    patientId: zod_1.z.string().uuid(),
    notes: zod_1.z.string().optional(),
    items: zod_1.z.array(zod_1.z.object({
        medicineId: zod_1.z.string().uuid(),
        dosage: zod_1.z.string(),
        frequency: zod_1.z.string(),
        durationDays: zod_1.z.number().int().positive(),
        instructions: zod_1.z.string().optional(),
    })),
});
exports.medicineInventorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Medicine name is required'),
    genericName: zod_1.z.string().optional(),
    category: zod_1.z.string().min(1, 'Category is required'),
    manufacturer: zod_1.z.string().optional(),
    unitPrice: zod_1.z.number().positive(),
    stockQuantity: zod_1.z.number().int().nonnegative(),
    reorderLevel: zod_1.z.number().int().nonnegative(),
    expiryDate: zod_1.z.string(),
    batchNumber: zod_1.z.string().min(1, 'Batch number is required'),
    barcode: zod_1.z.string().optional(),
});
exports.labReportResultSchema = zod_1.z.object({
    labReportId: zod_1.z.string().uuid(),
    resultValue: zod_1.z.string().min(1, 'Result value is required'),
    resultNotes: zod_1.z.string().optional(),
    technicianName: zod_1.z.string().optional(),
});
exports.admissionSchema = zod_1.z.object({
    patientId: zod_1.z.string().uuid(),
    bedId: zod_1.z.string().uuid(),
    doctorId: zod_1.z.string().uuid(),
});
exports.invoiceSchema = zod_1.z.object({
    patientId: zod_1.z.string().uuid(),
    appointmentId: zod_1.z.string().uuid().optional(),
    discount: zod_1.z.number().default(0),
    tax: zod_1.z.number().default(0),
    items: zod_1.z.array(zod_1.z.object({
        description: zod_1.z.string(),
        quantity: zod_1.z.number().int().positive(),
        unitPrice: zod_1.z.number().positive(),
    })),
});
exports.paymentSchema = zod_1.z.object({
    invoiceId: zod_1.z.string().uuid(),
    amount: zod_1.z.number().positive(),
    method: zod_1.z.enum(['CASH', 'CARD', 'UPI', 'INSURANCE', 'BANK_TRANSFER']),
    transactionId: zod_1.z.string().optional(),
});
