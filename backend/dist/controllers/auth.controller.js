"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const response_1 = require("../utils/response");
class AuthController {
    static async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            return (0, response_1.sendResponse)(res, 200, true, 'Login successful.', result);
        }
        catch (error) {
            next(error);
        }
    }
    static async me(req, res, next) {
        try {
            const result = await auth_service_1.AuthService.me(req.user.userId);
            return (0, response_1.sendResponse)(res, 200, true, 'User profile retrieved.', result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AuthController = AuthController;
