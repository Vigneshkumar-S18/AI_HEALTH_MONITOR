"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingController = void 0;
const billing_service_1 = require("../services/billing.service");
const response_1 = require("../utils/response");
class BillingController {
    static async list(req, res, next) {
        try {
            const invoices = await billing_service_1.BillingService.listInvoices(req.hospitalId);
            return (0, response_1.sendResponse)(res, 200, true, 'Invoices list retrieved', invoices);
        }
        catch (error) {
            next(error);
        }
    }
    static async create(req, res, next) {
        try {
            const invoice = await billing_service_1.BillingService.createInvoice(req.hospitalId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Invoice generated successfully', invoice);
        }
        catch (error) {
            next(error);
        }
    }
    static async recordPayment(req, res, next) {
        try {
            const payment = await billing_service_1.BillingService.recordPayment(req.hospitalId, req.body);
            return (0, response_1.sendResponse)(res, 201, true, 'Payment recorded successfully', payment);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.BillingController = BillingController;
