"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = void 0;
const sendResponse = (res, statusCode, success, message, data, meta, errors) => {
    const payload = {
        success,
        message,
        ...(data !== undefined && { data }),
        ...(meta && { meta }),
        ...(errors && { errors }),
    };
    return res.status(statusCode).json(payload);
};
exports.sendResponse = sendResponse;
