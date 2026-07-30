"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientController = void 0;
const patient_service_1 = require("../services/patient.service");
const response_1 = require("../utils/response");
class PatientController {
    static async list(req, res, next) {
        try {
            const search = req.query.search;
            const patients = await patient_service_1.PatientService.listPatients(req.hospitalId, search);
            return (0, response_1.sendResponse)(res, 200, true, 'Patients retrieved successfully', patients);
        }
        catch (error) {
            next(error);
        }
    }
    static async getById(req, res, next) {
        try {
            const patient = await patient_service_1.PatientService.getPatientById(req.hospitalId, req.params.id);
            return (0, response_1.sendResponse)(res, 200, true, 'Patient profile retrieved', patient);
        }
        catch (error) {
            next(error);
        }
    }
    static async register(req, res, next) {
        try {
            const patient = await patient_service_1.PatientService.registerPatient(req.hospitalId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Patient registered successfully', patient);
        }
        catch (error) {
            next(error);
        }
    }
    static async recordVitals(req, res, next) {
        try {
            const vitals = await patient_service_1.PatientService.recordVitals(req.body.patientId, req.user.userId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Vitals recorded successfully', vitals);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PatientController = PatientController;
