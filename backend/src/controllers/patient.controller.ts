import { Response, NextFunction } from 'express';
import { PatientService } from '../services/patient.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class PatientController {
  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const search = req.query.search as string;
      const patients = await PatientService.listPatients(req.hospitalId!, search);
      return sendResponse(res, 200, true, 'Patients retrieved successfully', patients);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const patient = await PatientService.getPatientById(req.hospitalId!, req.params.id);
      return sendResponse(res, 200, true, 'Patient profile retrieved', patient);
    } catch (error) {
      next(error);
    }
  }

  static async register(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const patient = await PatientService.registerPatient(req.hospitalId!, req.body);
      return sendResponse(res, 201, true, 'Patient registered successfully', patient);
    } catch (error) {
      next(error);
    }
  }

  static async recordVitals(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const vitals = await PatientService.recordVitals(req.body.patientId, req.user!.userId, req.body);
      return sendResponse(res, 201, true, 'Vitals recorded successfully', vitals);
    } catch (error) {
      next(error);
    }
  }
}
