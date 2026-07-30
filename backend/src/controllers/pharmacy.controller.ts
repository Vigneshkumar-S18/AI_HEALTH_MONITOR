import { Response, NextFunction } from 'express';
import { PharmacyService } from '../services/pharmacy.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class PharmacyController {
  static async listInventory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const inventory = await PharmacyService.listInventory(req.hospitalId!);
      return sendResponse(res, 200, true, 'Medicine inventory retrieved', inventory);
    } catch (error) {
      next(error);
    }
  }

  static async addMedicine(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const med = await PharmacyService.addMedicine(req.hospitalId!, req.body);
      return sendResponse(res, 201, true, 'Medicine added to stock inventory', med);
    } catch (error) {
      next(error);
    }
  }

  static async pendingPrescriptions(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const list = await PharmacyService.listPendingPrescriptions(req.hospitalId!);
      return sendResponse(res, 200, true, 'Pending prescriptions list retrieved', list);
    } catch (error) {
      next(error);
    }
  }

  static async dispense(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const rx = await PharmacyService.dispensePrescription(req.params.id);
      return sendResponse(res, 200, true, 'Prescription dispensed and stock updated', rx);
    } catch (error) {
      next(error);
    }
  }

  static async lowStockAlerts(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const alerts = await PharmacyService.getLowStockAlerts(req.hospitalId!);
      return sendResponse(res, 200, true, 'Low stock alerts retrieved', alerts);
    } catch (error) {
      next(error);
    }
  }
}
