import { Router } from 'express';
import { CommandCenterController } from '../controllers/commandCenter.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/metrics', authorizeRoles('ADMIN', 'DOCTOR'), CommandCenterController.metrics);

export default router;
