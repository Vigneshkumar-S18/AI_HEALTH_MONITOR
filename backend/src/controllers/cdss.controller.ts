import { Response, NextFunction } from 'express';
import { CDSSService } from '../services/cdss.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class CDSSController {
  static async evaluate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const alert = await CDSSService.evaluateDrugSafety(req.body.patientId, req.body.medicationName);
      return sendResponse(res, 200, true, 'CDSS drug safety evaluation complete', alert);
    } catch (error) {
      next(error);
    }
  }

  static async alerts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const alerts = await CDSSService.getPatientAlerts(req.params.patientId);
      return sendResponse(res, 200, true, 'Patient CDSS alerts retrieved', alerts);
    } catch (error) {
      next(error);
    }
  }
}
