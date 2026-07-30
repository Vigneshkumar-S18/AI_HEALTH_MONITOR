import { Response, NextFunction } from 'express';
import { AIAssistantService } from '../services/aiAssistant.service';
import { sendResponse } from '../utils/response';
import { AuthenticatedRequest } from '../types';
import { prisma } from '../database/client';

export class AIAssistantController {
  static async query(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { query } = req.body;
      let patientId = req.body.patientId;

      if (!patientId) {
        const patient = await prisma.patient.findFirst({ where: { hospitalId: req.hospitalId! } });
        patientId = patient?.id;
      }

      const result = await AIAssistantService.processQuery(patientId, query);
      return sendResponse(res, 200, true, 'RAG AI query processed', result);
    } catch (error) {
      next(error);
    }
  }
}
