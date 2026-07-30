import { Response, NextFunction } from 'express';
import { RecoveryService } from '../services/recovery.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class RecoveryController {
  static async log(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const log = await RecoveryService.logRecovery(req.body.patientId, req.body);
      return sendResponse(res, 201, true, 'Recovery daily progress logged', log);
    } catch (error) {
      next(error);
    }
  }

  static async history(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const history = await RecoveryService.getRecoveryHistory(req.params.patientId);
      return sendResponse(res, 200, true, 'Recovery timeline history retrieved', history);
    } catch (error) {
      next(error);
    }
  }
}
