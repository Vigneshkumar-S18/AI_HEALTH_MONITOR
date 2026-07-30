"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const patient_routes_1 = __importDefault(require("./patient.routes"));
const doctor_routes_1 = __importDefault(require("./doctor.routes"));
const appointment_routes_1 = __importDefault(require("./appointment.routes"));
const pharmacy_routes_1 = __importDefault(require("./pharmacy.routes"));
const lab_routes_1 = __importDefault(require("./lab.routes"));
const billing_routes_1 = __importDefault(require("./billing.routes"));
const admin_routes_1 = __importDefault(require("./admin.routes"));
// Phase 2 Routes
const aiAssistant_routes_1 = __importDefault(require("./aiAssistant.routes"));
const telemedicine_routes_1 = __importDefault(require("./telemedicine.routes"));
const recovery_routes_1 = __importDefault(require("./recovery.routes"));
const wearable_routes_1 = __importDefault(require("./wearable.routes"));
const chat_routes_1 = __importDefault(require("./chat.routes"));
// Phase 3 ACI Routes
const aci_routes_1 = __importDefault(require("./aci.routes"));
const cdss_routes_1 = __importDefault(require("./cdss.routes"));
const predictive_routes_1 = __importDefault(require("./predictive.routes"));
const commandCenter_routes_1 = __importDefault(require("./commandCenter.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/patients', patient_routes_1.default);
router.use('/doctors', doctor_routes_1.default);
router.use('/appointments', appointment_routes_1.default);
router.use('/pharmacy', pharmacy_routes_1.default);
router.use('/lab', lab_routes_1.default);
router.use('/billing', billing_routes_1.default);
router.use('/admin', admin_routes_1.default);
// Phase 2
router.use('/ai-assistant', aiAssistant_routes_1.default);
router.use('/telemedicine', telemedicine_routes_1.default);
router.use('/recovery', recovery_routes_1.default);
router.use('/wearables', wearable_routes_1.default);
router.use('/chat', chat_routes_1.default);
// Phase 3 Ambient Clinical Intelligence
router.use('/aci', aci_routes_1.default);
router.use('/cdss', cdss_routes_1.default);
router.use('/predictive', predictive_routes_1.default);
router.use('/command-center', commandCenter_routes_1.default);
exports.default = router;
