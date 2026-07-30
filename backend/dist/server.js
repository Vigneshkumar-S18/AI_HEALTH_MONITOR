"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const socket_1 = require("./socket");
const server = http_1.default.createServer(app_1.default);
const io = (0, socket_1.initializeSocketIO)(server);
server.listen(config_1.config.port, () => {
    console.log(`
=====================================================
  🏥 MedFlow AI - Phase 2 Patient Engagement Server
=====================================================
  Status:      Running in ${config_1.config.env.toUpperCase()} mode
  Port:        http://localhost:${config_1.config.port}
  WebSockets:  Socket.IO active
  API Prefix:  http://localhost:${config_1.config.port}${config_1.config.apiPrefix}
  Healthcheck: http://localhost:${config_1.config.port}/health
=====================================================
  `);
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Promise Rejection:', err);
    server.close(() => process.exit(1));
});
