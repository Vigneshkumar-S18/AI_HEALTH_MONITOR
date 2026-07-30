import { Router } from 'express';
import { LabController } from '../controllers/lab.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { labReportResultSchema } from '../validators';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/tests', LabController.listTests);
router.post('/order', authorizeRoles('DOCTOR', 'ADMIN', 'RECEPTIONIST'), LabController.orderTest);
router.get('/orders/pending', authorizeRoles('LAB_TECH', 'ADMIN'), LabController.pendingOrders);
router.post('/results', authorizeRoles('LAB_TECH', 'ADMIN'), validateRequest(labReportResultSchema), LabController.submitResult);

export default router;
