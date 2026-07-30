import { Router } from 'express';
import { DoctorController } from '../controllers/doctor.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { diagnosisSchema, prescriptionSchema } from '../validators';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/', DoctorController.list);
router.get('/queue', authorizeRoles('DOCTOR', 'ADMIN'), DoctorController.myQueue);
router.post('/diagnosis', authorizeRoles('DOCTOR'), validateRequest(diagnosisSchema), DoctorController.diagnosis);
router.post('/prescription', authorizeRoles('DOCTOR'), validateRequest(prescriptionSchema), DoctorController.createPrescription);

export default router;
