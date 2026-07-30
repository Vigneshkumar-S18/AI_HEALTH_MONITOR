"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabController = void 0;
const lab_service_1 = require("../services/lab.service");
const response_1 = require("../utils/response");
class LabController {
    static async listTests(req, res, next) {
        try {
            const tests = await lab_service_1.LabService.listLabTests(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Lab tests catalog retrieved', tests);
        }
        catch (error) {
            next(error);
        }
    }
    static async orderTest(req, res, next) {
        try {
            const { patientId, labTestId } = req.body;
            const order = await lab_service_1.LabService.orderLabTest(patientId, labTestId);
            return (0, response_1.sendResponse)(res, 201, true, 'Lab test order placed', order);
        }
        catch (error) {
            next(error);
        }
    }
    static async pendingOrders(req, res, next) {
        try {
            const orders = await lab_service_1.LabService.listPendingOrders(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Pending lab worklist retrieved', orders);
        }
        catch (error) {
            next(error);
        }
    }
    static async submitResult(req, res, next) {
        try {
            const result = await lab_service_1.LabService.submitResult(req.body.labReportId, req.body);
            return (0, response_1.sendResponse)(res, 200, true, 'Lab test report uploaded & completed', result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.LabController = LabController;
