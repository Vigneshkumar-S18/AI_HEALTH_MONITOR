"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PharmacyController = void 0;
const pharmacy_service_1 = require("../services/pharmacy.service");
const response_1 = require("../utils/response");
class PharmacyController {
    static async listInventory(req, res, next) {
        try {
            const inventory = await pharmacy_service_1.PharmacyService.listInventory(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Medicine inventory retrieved', inventory);
        }
        catch (error) {
            next(error);
        }
    }
    static async addMedicine(req, res, next) {
        try {
            const med = await pharmacy_service_1.PharmacyService.addMedicine(req.hospitalId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Medicine added to stock inventory', med);
        }
        catch (error) {
            next(error);
        }
    }
    static async pendingPrescriptions(req, res, next) {
        try {
            const list = await pharmacy_service_1.PharmacyService.listPendingPrescriptions(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Pending prescriptions list retrieved', list);
        }
        catch (error) {
            next(error);
        }
    }
    static async dispense(req, res, next) {
        try {
            const rx = await pharmacy_service_1.PharmacyService.dispensePrescription(req.params.id);
            return (0, response_1.sendResponse)(res, 200, true, 'Prescription dispensed and stock updated', rx);
        }
        catch (error) {
            next(error);
        }
    }
    static async lowStockAlerts(req, res, next) {
        try {
            const alerts = await pharmacy_service_1.PharmacyService.getLowStockAlerts(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Low stock alerts retrieved', alerts);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PharmacyController = PharmacyController;
