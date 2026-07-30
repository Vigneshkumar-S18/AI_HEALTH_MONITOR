"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoveryController = void 0;
const recovery_service_1 = require("../services/recovery.service");
const response_1 = require("../utils/response");
class RecoveryController {
    static async log(req, res, next) {
        try {
            const log = await recovery_service_1.RecoveryService.logRecovery(req.body.patientId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Recovery daily progress logged', log);
        }
        catch (error) {
            next(error);
        }
    }
    static async history(req, res, next) {
        try {
            const history = await recovery_service_1.RecoveryService.getRecoveryHistory(req.params.patientId);
            return (0, response_1.sendResponse)(res, 200, true, 'Recovery timeline history retrieved', history);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.RecoveryController = RecoveryController;
