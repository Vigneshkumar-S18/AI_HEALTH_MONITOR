"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const appointment_service_1 = require("../services/appointment.service");
const response_1 = require("../utils/response");
class AppointmentController {
    static async list(req, res, next) {
        try {
            const doctorId = req.query.doctorId;
            const status = req.query.status;
            const appointments = await appointment_service_1.AppointmentService.listAppointments(req.hospitalId, doctorId, status);
            return (0, response_1.sendResponse)(res, 200, true, 'Appointments list retrieved', appointments);
        }
        catch (error) {
            next(error);
        }
    }
    static async book(req, res, next) {
        try {
            const appointment = await appointment_service_1.AppointmentService.bookAppointment(req.hospitalId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Appointment booked successfully with Token #' + appointment.tokenNumber, appointment);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const { status } = req.body;
            const updated = await appointment_service_1.AppointmentService.updateStatus(req.hospitalId, req.params.id, status);
            return (0, response_1.sendResponse)(res, 200, true, 'Appointment status updated', updated);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AppointmentController = AppointmentController;
