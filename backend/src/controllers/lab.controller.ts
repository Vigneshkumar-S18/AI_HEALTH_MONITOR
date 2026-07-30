import { Response, NextFunction } from 'express';
import { LabService } from '../services/lab.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class LabController {
  static async listTests(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const tests = await LabService.listLabTests(req.hospitalId!);
      return sendResponse(res, 200, true, 'Lab tests catalog retrieved', tests);
    } catch (error) {
      next(error);
    }
  }

  static async orderTest(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { patientId, labTestId } = req.body;
      const order = await LabService.orderLabTest(patientId, labTestId);
      return sendResponse(res, 201, true, 'Lab test order placed', order);
    } catch (error) {
      next(error);
    }
  }

  static async pendingOrders(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const orders = await LabService.listPendingOrders(req.hospitalId!);
      return sendResponse(res, 200, true, 'Pending lab worklist retrieved', orders);
    } catch (error) {
      next(error);
    }
  }

  static async submitResult(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const result = await LabService.submitResult(req.body.labReportId, req.body);
      return sendResponse(res, 200, true, 'Lab test report uploaded & completed', result);
    } catch (error) {
      next(error);
    }
  }
}
