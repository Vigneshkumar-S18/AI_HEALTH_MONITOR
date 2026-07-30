import { Router } from 'express';
import { TelemedicineController } from '../controllers/telemedicine.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/session', TelemedicineController.session);
router.patch('/session/:id/status', TelemedicineController.updateStatus);

export default router;
