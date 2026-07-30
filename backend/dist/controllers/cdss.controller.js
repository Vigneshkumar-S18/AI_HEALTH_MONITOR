"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDSSController = void 0;
const cdss_service_1 = require("../services/cdss.service");
const response_1 = require("../utils/response");
class CDSSController {
    static async evaluate(req, res, next) {
        try {
            const alert = await cdss_service_1.CDSSService.evaluateDrugSafety(req.body.patientId, req.body.medicationName);
            return (0, response_1.sendResponse)(res, 200, true, 'CDSS drug safety evaluation complete', alert);
        }
        catch (error) {
            next(error);
        }
    }
    static async alerts(req, res, next) {
        try {
            const alerts = await cdss_service_1.CDSSService.getPatientAlerts(req.params.patientId);
            return (0, response_1.sendResponse)(res, 200, true, 'Patient CDSS alerts retrieved', alerts);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CDSSController = CDSSController;
