"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAssistantController = void 0;
const aiAssistant_service_1 = require("../services/aiAssistant.service");
const response_1 = require("../utils/response");
const client_1 = require("../database/client");
class AIAssistantController {
    static async query(req, res, next) {
        try {
            const { query } = req.body;
            let patientId = req.body.patientId;
            if (!patientId) {
                const patient = await client_1.prisma.patient.findFirst({ where: { hospitalId: req.hospitalId } });
                patientId = patient?.id;
            }
            const result = await aiAssistant_service_1.AIAssistantService.processQuery(patientId, query);
            return (0, response_1.sendResponse)(res, 200, true, 'RAG AI query processed', result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AIAssistantController = AIAssistantController;
