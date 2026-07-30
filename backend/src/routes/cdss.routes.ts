import { Router } from 'express';
import { CDSSController } from '../controllers/cdss.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/evaluate', CDSSController.evaluate);
router.get('/alerts/:patientId', CDSSController.alerts);

export default router;
