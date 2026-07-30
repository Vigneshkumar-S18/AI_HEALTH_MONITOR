import { Router } from 'express';
import { AIAssistantController } from '../controllers/aiAssistant.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/query', AIAssistantController.query);

export default router;
