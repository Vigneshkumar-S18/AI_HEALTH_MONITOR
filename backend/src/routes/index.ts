import { Router } from 'express';
import authRoutes from './auth.routes';
import patientRoutes from './patient.routes';
import doctorRoutes from './doctor.routes';
import appointmentRoutes from './appointment.routes';
import pharmacyRoutes from './pharmacy.routes';
import labRoutes from './lab.routes';
import billingRoutes from './billing.routes';
import adminRoutes from './admin.routes';

// Phase 2 Routes
import aiAssistantRoutes from './aiAssistant.routes';
import telemedicineRoutes from './telemedicine.routes';
import recoveryRoutes from './recovery.routes';
import wearableRoutes from './wearable.routes';
import chatRoutes from './chat.routes';

// Phase 3 ACI Routes
import aciRoutes from './aci.routes';
import cdssRoutes from './cdss.routes';
import predictiveRoutes from './predictive.routes';
import commandCenterRoutes from './commandCenter.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/patients', patientRoutes);
router.use('/doctors', doctorRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/pharmacy', pharmacyRoutes);
router.use('/lab', labRoutes);
router.use('/billing', billingRoutes);
router.use('/admin', adminRoutes);

// Phase 2
router.use('/ai-assistant', aiAssistantRoutes);
router.use('/telemedicine', telemedicineRoutes);
router.use('/recovery', recoveryRoutes);
router.use('/wearables', wearableRoutes);
router.use('/chat', chatRoutes);

// Phase 3 Ambient Clinical Intelligence
router.use('/aci', aciRoutes);
router.use('/cdss', cdssRoutes);
router.use('/predictive', predictiveRoutes);
router.use('/command-center', commandCenterRoutes);

export default router;
