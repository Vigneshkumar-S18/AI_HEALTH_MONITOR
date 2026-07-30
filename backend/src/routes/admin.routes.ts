import { Router } from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/dashboard', authorizeRoles('ADMIN'), AdminController.dashboard);
router.get('/wards', AdminController.wards);
router.get('/audit-logs', authorizeRoles('ADMIN'), AdminController.auditLogs);

export default router;
