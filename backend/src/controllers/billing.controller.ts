import { Response, NextFunction } from 'express';
import { BillingService } from '../services/billing.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class BillingController {
  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const invoices = await BillingService.listInvoices(req.hospitalId!);
      return sendResponse(res, 200, true, 'Invoices list retrieved', invoices);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const invoice = await BillingService.createInvoice(req.hospitalId!, req.body);
      return sendResponse(res, 201, true, 'Invoice generated successfully', invoice);
    } catch (error) {
      next(error);
    }
  }

  static async recordPayment(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const payment = await BillingService.recordPayment(req.hospitalId!, req.body);
      return sendResponse(res, 201, true, 'Payment recorded successfully', payment);
    } catch (error) {
      next(error);
    }
  }
}
