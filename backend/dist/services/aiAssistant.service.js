"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIAssistantService = void 0;
const client_1 = require("../database/client");
class AIAssistantService {
    static async processQuery(patientId, query) {
        const qLower = query.toLowerCase();
        // Fetch patient context for RAG
        const patient = await client_1.prisma.patient.findUnique({
            where: { id: patientId },
            include: {
                prescriptions: { include: { items: { include: { medicine: true } } } },
                labReports: { include: { labTest: true } },
                vitals: { orderBy: { recordedAt: 'desc' }, take: 1 },
            },
        });
        let response = '';
        let sourceContext = 'General Hospital Knowledge Base';
        let escalated = false;
        // RAG Intent 1: Explain Prescription / Medication
        if (qLower.includes('medicine') || qLower.includes('prescription') || qLower.includes('dosage') || qLower.includes('atorvastatin') || qLower.includes('amoxicillin')) {
            sourceContext = 'EMR Prescriptions';
            if (patient?.prescriptions.length) {
                const activeItems = patient.prescriptions[0].items;
                const medsList = activeItems.map((i) => `• ${i.medicine.name} (${i.dosage}, ${i.frequency}): Take for ${i.durationDays} days as instructed: "${i.instructions || 'After meals'}".`).join('\n');
                response = `Here is the explanation of your active prescribed medications:\n\n${medsList}\n\n💡 Reminder: Always take your medications with water as prescribed by Dr. Sarah Jenkins.`;
            }
            else {
                response = 'You currently have no active prescriptions logged in your portal. Please consult your physician for advice.';
            }
        }
        // RAG Intent 2: Explain Lab Report Values
        else if (qLower.includes('lab') || qLower.includes('report') || qLower.includes('cbc') || qLower.includes('blood test') || qLower.includes('results')) {
            sourceContext = 'EMR Lab Reports';
            if (patient?.labReports.length) {
                const latestLab = patient.labReports[0];
                response = `Here is an explanation of your latest ${latestLab.labTest.name}:\n\n` +
                    `• Test Code: ${latestLab.labTest.code}\n` +
                    `• Reference Range: ${latestLab.labTest.normalRange || 'Standard adult reference'}\n` +
                    `• Status: ${latestLab.status}\n` +
                    `• Result Value: ${latestLab.resultValue || 'Pending verification'}\n\n` +
                    `ℹ️ Reference values represent typical healthy physiological ranges. Your doctor will review this alongside your overall clinical condition.`;
            }
            else {
                response = 'No diagnostic lab reports were found under your account profile.';
            }
        }
        // RAG Intent 3: Vitals & Recovery
        else if (qLower.includes('vital') || qLower.includes('bp') || qLower.includes('blood pressure') || qLower.includes('heart rate')) {
            sourceContext = 'EMR Clinical Vitals';
            if (patient?.vitals.length) {
                const v = patient.vitals[0];
                response = `Your most recently logged vitals:\n` +
                    `• Blood Pressure: ${v.systolicBp}/${v.diastolicBp} mmHg (Normal adult goal: < 120/80 mmHg)\n` +
                    `• Heart Rate: ${v.heartRate} bpm\n` +
                    `• SpO2: ${v.spO2}%`;
            }
            else {
                response = 'No vitals history recorded yet today.';
            }
        }
        // Escalation trigger for urgent symptoms
        else if (qLower.includes('chest pain') || qLower.includes('emergency') || qLower.includes('severe') || qLower.includes('bleeding')) {
            sourceContext = 'Triage Escalation Engine';
            escalated = true;
            response = '⚠️ RED ALERT: Your query mentions potential emergency symptoms. Please call 911 immediately or contact our Emergency Triage Desk at +1 (555) 019-2831. An urgent alert has been escalated to your attending doctor.';
        }
        // FAQ & Hospital Navigation
        else {
            sourceContext = 'Hospital Knowledge Base FAQ';
            response = `Welcome to MedFlow AI Assistant. I can help explain your medical reports, medication schedules, lab results, and hospital visit guides.\n\n` +
                `Useful topics you can ask me:\n` +
                `• "Explain my active prescriptions"\n` +
                `• "What does my CBC lab test mean?"\n` +
                `• "What were my last blood pressure readings?"\n` +
                `• "How do I request a refill?"`;
        }
        // Store in AI Chat History table
        await client_1.prisma.aIChatHistory.create({
            data: {
                patientId,
                query,
                response,
                sourceContext,
                escalated,
            },
        });
        return {
            query,
            response,
            sourceContext,
            escalated,
        };
    }
}
exports.AIAssistantService = AIAssistantService;
