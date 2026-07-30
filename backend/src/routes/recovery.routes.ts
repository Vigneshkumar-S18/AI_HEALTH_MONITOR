import { Router } from 'express';
import { RecoveryController } from '../controllers/recovery.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/log', RecoveryController.log);
router.get('/history/:patientId', RecoveryController.history);

export default router;
