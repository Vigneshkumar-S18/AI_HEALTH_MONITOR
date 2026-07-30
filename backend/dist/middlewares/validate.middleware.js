"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const zod_1 = require("zod");
const response_1 = require("../utils/response");
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const issueDetails = error.errors.map((err) => ({
                    field: err.path.join('.'),
                    message: err.message,
                }));
                return (0, response_1.sendResponse)(res, 400, false, 'Validation failed for request payload', undefined, undefined, issueDetails);
            }
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
