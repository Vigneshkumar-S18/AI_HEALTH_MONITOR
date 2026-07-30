"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACIController = void 0;
const aci_service_1 = require("../services/aci.service");
const response_1 = require("../utils/response");
class ACIController {
    static async startSession(req, res, next) {
        try {
            const { appointmentId, doctorId, patientId } = req.body;
            const session = await aci_service_1.ACIService.startSession(req.hospitalId, appointmentId, doctorId, patientId);
            return (0, response_1.sendResponse)(res, 200, true, 'ACI audio session initialized', session);
        }
        catch (error) {
            next(error);
        }
    }
    static async generate(req, res, next) {
        try {
            const session = await aci_service_1.ACIService.generateNoteAndCodes(req.params.sessionId);
            return (0, response_1.sendResponse)(res, 200, true, 'ACI transcript, SOAP draft, and ICD/CPT codes generated', session);
        }
        catch (error) {
            next(error);
        }
    }
    static async signOff(req, res, next) {
        try {
            const signed = await aci_service_1.ACIService.doctorSignOff(req.params.sessionId);
            return (0, response_1.sendResponse)(res, 200, true, 'Clinical note signed and committed to EMR record', signed);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ACIController = ACIController;
