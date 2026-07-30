import { Response, NextFunction } from 'express';
import { WearableService } from '../services/wearable.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class WearableController {
  static async sync(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const metric = await WearableService.syncMetrics(req.body.patientId, req.body);
      return sendResponse(res, 201, true, 'Wearable health metric synced', metric);
    } catch (error) {
      next(error);
    }
  }

  static async metrics(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const list = await WearableService.getLatestMetrics(req.params.patientId);
      return sendResponse(res, 200, true, 'Wearable analytics retrieved', list);
    } catch (error) {
      next(error);
    }
  }
}
