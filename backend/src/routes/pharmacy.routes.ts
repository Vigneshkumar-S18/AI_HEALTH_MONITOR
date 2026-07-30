import { Router } from 'express';
import { PharmacyController } from '../controllers/pharmacy.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { medicineInventorySchema } from '../validators';
import { authorizeRoles } from '../middlewares/rbac.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.get('/inventory', PharmacyController.listInventory);
router.post('/inventory', authorizeRoles('PHARMACIST', 'ADMIN'), validateRequest(medicineInventorySchema), PharmacyController.addMedicine);
router.get('/prescriptions/pending', authorizeRoles('PHARMACIST', 'ADMIN'), PharmacyController.pendingPrescriptions);
router.post('/prescriptions/:id/dispense', authorizeRoles('PHARMACIST', 'ADMIN'), PharmacyController.dispense);
router.get('/alerts/low-stock', PharmacyController.lowStockAlerts);

export default router;
