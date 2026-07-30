import { Response, NextFunction } from 'express';
import { ACIService } from '../services/aci.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class ACIController {
  static async startSession(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { appointmentId, doctorId, patientId } = req.body;
      const session = await ACIService.startSession(req.hospitalId!, appointmentId, doctorId, patientId);
      return sendResponse(res, 200, true, 'ACI audio session initialized', session);
    } catch (error) {
      next(error);
    }
  }

  static async generate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const session = await ACIService.generateNoteAndCodes(req.params.sessionId);
      return sendResponse(res, 200, true, 'ACI transcript, SOAP draft, and ICD/CPT codes generated', session);
    } catch (error) {
      next(error);
    }
  }

  static async signOff(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const signed = await ACIService.doctorSignOff(req.params.sessionId);
      return sendResponse(res, 200, true, 'Clinical note signed and committed to EMR record', signed);
    } catch (error) {
      next(error);
    }
  }
}
