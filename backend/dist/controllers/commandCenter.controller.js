"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandCenterController = void 0;
const commandCenter_service_1 = require("../services/commandCenter.service");
const response_1 = require("../utils/response");
class CommandCenterController {
    static async metrics(req, res, next) {
        try {
            const stats = await commandCenter_service_1.CommandCenterService.getExecutiveCommandCenterStats(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Hospital command center real-time KPIs retrieved', stats);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CommandCenterController = CommandCenterController;
