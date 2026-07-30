"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WearableController = void 0;
const wearable_service_1 = require("../services/wearable.service");
const response_1 = require("../utils/response");
class WearableController {
    static async sync(req, res, next) {
        try {
            const metric = await wearable_service_1.WearableService.syncMetrics(req.body.patientId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Wearable health metric synced', metric);
        }
        catch (error) {
            next(error);
        }
    }
    static async metrics(req, res, next) {
        try {
            const list = await wearable_service_1.WearableService.getLatestMetrics(req.params.patientId);
            return (0, response_1.sendResponse)(res, 200, true, 'Wearable analytics retrieved', list);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WearableController = WearableController;
