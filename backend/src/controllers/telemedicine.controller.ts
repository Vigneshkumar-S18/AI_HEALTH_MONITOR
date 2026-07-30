import { Response, NextFunction } from 'express';
import { TelemedicineService } from '../services/telemedicine.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class TelemedicineController {
  static async session(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { appointmentId, patientId, doctorId } = req.body;
      const session = await TelemedicineService.createOrGetSession(
        req.hospitalId!,
        appointmentId,
        patientId,
        doctorId
      );
      return sendResponse(res, 200, true, 'Telemedicine virtual session initialized', session);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const updated = await TelemedicineService.updateStatus(req.params.id, status);
      return sendResponse(res, 200, true, 'Telemedicine call status updated', updated);
    } catch (error) {
      next(error);
    }
  }
}
