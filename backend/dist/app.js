"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = require("./middlewares/error.middleware");
const app = (0, express_1.default)();
// Security Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({ origin: config_1.config.cors.origin, credentials: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 300, // 300 requests per 15 mins per IP
    message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use(limiter);
// Healthcheck
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'HEALTHY', timestamp: new Date(), service: 'MedFlow AI Backend API' });
});
// API Routes
app.use(config_1.config.apiPrefix, routes_1.default);
// Global Error Handler
app.use(error_middleware_1.errorHandler);
exports.default = app;
