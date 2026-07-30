import { Router } from 'express';
import { WearableController } from '../controllers/wearable.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/sync', WearableController.sync);
router.get('/:patientId', WearableController.metrics);

export default router;
