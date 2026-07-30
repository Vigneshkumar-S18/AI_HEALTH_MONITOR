import { Router } from 'express';
import { BillingController } from '../controllers/billing.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { invoiceSchema, paymentSchema } from '../validators';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/invoices', BillingController.list);
router.post('/invoices', authorizeRoles('RECEPTIONIST', 'ADMIN'), validateRequest(invoiceSchema), BillingController.create);
router.post('/payments', authorizeRoles('RECEPTIONIST', 'ADMIN'), validateRequest(paymentSchema), BillingController.recordPayment);

export default router;
