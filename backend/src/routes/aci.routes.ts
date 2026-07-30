import { Router } from 'express';
import { ACIController } from '../controllers/aci.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/start', authorizeRoles('DOCTOR', 'ADMIN'), ACIController.startSession);
router.post('/generate/:sessionId', authorizeRoles('DOCTOR', 'ADMIN'), ACIController.generate);
router.post('/sign/:sessionId', authorizeRoles('DOCTOR'), ACIController.signOff);

export default router;
