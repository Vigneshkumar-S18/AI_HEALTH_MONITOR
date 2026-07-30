import { Router } from 'express';
import { PatientController } from '../controllers/patient.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { patientRegistrationSchema, vitalsSchema } from '../validators';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/', PatientController.list);
router.get('/:id', PatientController.getById);
router.post('/', validateRequest(patientRegistrationSchema), PatientController.register);
router.post('/vitals', validateRequest(vitalsSchema), PatientController.recordVitals);

export default router;
