import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { appointmentBookingSchema } from '../validators';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/', AppointmentController.list);
router.post('/book', validateRequest(appointmentBookingSchema), AppointmentController.book);
router.patch('/:id/status', AppointmentController.updateStatus);

export default router;
