import { Response, NextFunction } from 'express';
import { PredictiveService } from '../services/predictive.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class PredictiveController {
  static async riskScores(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const risks = await PredictiveService.calculateRisks(req.params.patientId);
      return sendResponse(res, 200, true, 'Predictive patient risk scores calculated', risks);
    } catch (error) {
      next(error);
    }
  }
}
