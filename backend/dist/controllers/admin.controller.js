"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const response_1 = require("../utils/response");
class AdminController {
    static async dashboard(req, res, next) {
        try {
            const stats = await admin_service_1.AdminService.getDashboardStats(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Executive analytics dashboard data retrieved', stats);
        }
        catch (error) {
            next(error);
        }
    }
    static async wards(req, res, next) {
        try {
            const wards = await admin_service_1.AdminService.listWardsAndBeds(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Wards and beds matrix retrieved', wards);
        }
        catch (error) {
            next(error);
        }
    }
    static async auditLogs(req, res, next) {
        try {
            const logs = await admin_service_1.AdminService.listAuditLogs(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'System audit logs retrieved', logs);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
