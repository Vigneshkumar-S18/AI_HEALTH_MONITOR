"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PredictiveController = void 0;
const predictive_service_1 = require("../services/predictive.service");
const response_1 = require("../utils/response");
class PredictiveController {
    static async riskScores(req, res, next) {
        try {
            const risks = await predictive_service_1.PredictiveService.calculateRisks(req.params.patientId);
            return (0, response_1.sendResponse)(res, 200, true, 'Predictive patient risk scores calculated', risks);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PredictiveController = PredictiveController;
