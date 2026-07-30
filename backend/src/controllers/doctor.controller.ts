import { Response, NextFunction } from 'express';
import { DoctorService } from '../services/doctor.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';
import { prisma } from '../database/client';

export class DoctorController {
  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const doctors = await DoctorService.listDoctors(req.hospitalId!);
      return sendResponse(res, 200, true, 'Doctors retrieved', doctors);
    } catch (error) {
      next(error);
    }
  }

  static async myQueue(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const queue = await DoctorService.getDoctorQueue(req.hospitalId!, req.user!.userId);
      return sendResponse(res, 200, true, 'Doctor consultation queue retrieved', queue);
    } catch (error) {
      next(error);
    }
  }

  static async diagnosis(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const doctor = await prisma.doctor.findUnique({ where: { userId: req.user!.userId } });
      if (!doctor) throw { statusCode: 403, message: 'Only doctor accounts can log SOAP diagnoses.' };

      const diagnosis = await DoctorService.saveDiagnosis(doctor.id, req.body);
      return sendResponse(res, 200, true, 'SOAP notes & diagnosis saved', diagnosis);
    } catch (error) {
      next(error);
    }
  }

  static async createPrescription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const doctor = await prisma.doctor.findUnique({ where: { userId: req.user!.userId } });
      if (!doctor) throw { statusCode: 403, message: 'Only doctor accounts can write prescriptions.' };

      const prescription = await DoctorService.createPrescription(doctor.id, req.body);
      return sendResponse(res, 201, true, 'Prescription issued successfully', prescription);
    } catch (error) {
      next(error);
    }
  }
}
