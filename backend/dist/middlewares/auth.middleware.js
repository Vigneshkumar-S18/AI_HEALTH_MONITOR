"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJWT = void 0;
const jwt_1 = require("../utils/jwt");
const response_1 = require("../utils/response");
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return (0, response_1.sendResponse)(res, 401, false, 'Authentication token missing or invalid format.');
    }
    const token = authHeader.split(' ')[1];
    const decoded = (0, jwt_1.verifyAccessToken)(token);
    if (!decoded) {
        return (0, response_1.sendResponse)(res, 401, false, 'Invalid or expired access token.');
    }
    req.user = decoded;
    req.hospitalId = decoded.hospitalId;
    next();
};
exports.authenticateJWT = authenticateJWT;
