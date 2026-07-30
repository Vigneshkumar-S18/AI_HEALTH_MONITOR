import { Response, NextFunction } from 'express';
import { AdminService } from '../services/admin.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class AdminController {
  static async dashboard(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const stats = await AdminService.getDashboardStats(req.hospitalId!);
      return sendResponse(res, 200, true, 'Executive analytics dashboard data retrieved', stats);
    } catch (error) {
      next(error);
    }
  }

  static async wards(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const wards = await AdminService.listWardsAndBeds(req.hospitalId!);
      return sendResponse(res, 200, true, 'Wards and beds matrix retrieved', wards);
    } catch (error) {
      next(error);
    }
  }

  static async auditLogs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const logs = await AdminService.listAuditLogs(req.hospitalId!);
      return sendResponse(res, 200, true, 'System audit logs retrieved', logs);
    } catch (error) {
      next(error);
    }
  }
}
