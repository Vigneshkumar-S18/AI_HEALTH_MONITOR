"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const response_1 = require("../utils/response");
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return (0, response_1.sendResponse)(res, 401, false, 'User unauthenticated.');
        }
        if (!allowedRoles.includes(req.user.role)) {
            return (0, response_1.sendResponse)(res, 403, false, `Access denied. Requires one of roles: ${allowedRoles.join(', ')}`);
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
