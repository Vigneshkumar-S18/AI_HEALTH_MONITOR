"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorController = void 0;
const doctor_service_1 = require("../services/doctor.service");
const response_1 = require("../utils/response");
const client_1 = require("../database/client");
class DoctorController {
    static async list(req, res, next) {
        try {
            const doctors = await doctor_service_1.DoctorService.listDoctors(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Doctors retrieved', doctors);
        }
        catch (error) {
            next(error);
        }
    }
    static async myQueue(req, res, next) {
        try {
            const queue = await doctor_service_1.DoctorService.getDoctorQueue(req.hospitalId, req.user.userId);
            return (0, response_1.sendResponse)(res, 200, true, 'Doctor consultation queue retrieved', queue);
        }
        catch (error) {
            next(error);
        }
    }
    static async diagnosis(req, res, next) {
        try {
            const doctor = await client_1.prisma.doctor.findUnique({ where: { userId: req.user.userId } });
            if (!doctor)
                throw { statusCode: 403, message: 'Only doctor accounts can log SOAP diagnoses.' };
            const diagnosis = await doctor_service_1.DoctorService.saveDiagnosis(doctor.id, req.body);
            return (0, response_1.sendResponse)(res, 200, true, 'SOAP notes & diagnosis saved', diagnosis);
        }
        catch (error) {
            next(error);
        }
    }
    static async createPrescription(req, res, next) {
        try {
            const doctor = await client_1.prisma.doctor.findUnique({ where: { userId: req.user.userId } });
            if (!doctor)
                throw { statusCode: 403, message: 'Only doctor accounts can write prescriptions.' };
            const prescription = await doctor_service_1.DoctorService.createPrescription(doctor.id, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Prescription issued successfully', prescription);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorController = DoctorController;
