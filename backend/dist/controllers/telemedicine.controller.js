"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemedicineController = void 0;
const telemedicine_service_1 = require("../services/telemedicine.service");
const response_1 = require("../utils/response");
class TelemedicineController {
    static async session(req, res, next) {
        try {
            const { appointmentId, patientId, doctorId } = req.body;
            const session = await telemedicine_service_1.TelemedicineService.createOrGetSession(req.hospitalId, appointmentId, patientId, doctorId);
            return (0, response_1.sendResponse)(res, 200, true, 'Telemedicine virtual session initialized', session);
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const { status } = req.body;
            const updated = await telemedicine_service_1.TelemedicineService.updateStatus(req.params.id, status);
            return (0, response_1.sendResponse)(res, 200, true, 'Telemedicine call status updated', updated);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TelemedicineController = TelemedicineController;
