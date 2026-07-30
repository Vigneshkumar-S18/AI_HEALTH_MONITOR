"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceTenantScope = void 0;
const response_1 = require("../utils/response");
const enforceTenantScope = (req, res, next) => {
    const headerTenant = req.headers['x-hospital-id'];
    if (req.user?.hospitalId) {
        if (headerTenant && headerTenant !== req.user.hospitalId && req.user.role !== 'ADMIN') {
            return (0, response_1.sendResponse)(res, 403, false, 'Cross-tenant access violation restricted.');
        }
        req.hospitalId = req.user.hospitalId;
    }
    else if (headerTenant) {
        req.hospitalId = headerTenant;
    }
    if (!req.hospitalId) {
        return (0, response_1.sendResponse)(res, 400, false, 'Hospital tenant identification missing in request scope.');
    }
    next();
};
exports.enforceTenantScope = enforceTenantScope;
