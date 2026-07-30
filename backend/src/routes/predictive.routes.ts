import { Router } from 'express';
import { PredictiveController } from '../controllers/predictive.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/risk-scores/:patientId', PredictiveController.riskScores);

export default router;
