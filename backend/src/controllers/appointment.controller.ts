import { Response, NextFunction } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';

export class AppointmentController {
  static async list(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const doctorId = req.query.doctorId as string;
      const status = req.query.status as any;
      const appointments = await AppointmentService.listAppointments(req.hospitalId!, doctorId, status);
      return sendResponse(res, 200, true, 'Appointments list retrieved', appointments);
    } catch (error) {
      next(error);
    }
  }

  static async book(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const appointment = await AppointmentService.bookAppointment(req.hospitalId!, req.body);
      return sendResponse(res, 201, true, 'Appointment booked successfully with Token #' + appointment.tokenNumber, appointment);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { status } = req.body;
      const updated = await AppointmentService.updateStatus(req.hospitalId!, req.params.id, status);
      return sendResponse(res, 200, true, 'Appointment status updated', updated);
    } catch (error) {
      next(error);
    }
  }
}
