import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';
import { enforceTenantScope } from '../middlewares/tenant.middleware';

const router = Router();

router.use(authenticateJWT, enforceTenantScope);

router.post('/send', ChatController.send);
router.get('/history/:userId', ChatController.list);

export default router;
