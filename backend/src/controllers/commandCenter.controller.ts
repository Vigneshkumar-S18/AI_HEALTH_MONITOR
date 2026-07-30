import { Response, NextFunction } from 'express';
import { CommandCenterService } from '../services/commandCenter.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class CommandCenterController {
  static async metrics(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const stats = await CommandCenterService.getExecutiveCommandCenterStats(req.hospitalId!);
      return sendResponse(res, 200, true, 'Hospital command center real-time KPIs retrieved', stats);
    } catch (error) {
      next(error);
    }
  }
}
