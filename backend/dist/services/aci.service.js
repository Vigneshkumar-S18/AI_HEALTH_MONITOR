"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACIService = void 0;
const client_1 = require("../database/client");
class ACIService {
    static async startSession(hospitalId, appointmentId, doctorId, patientId) {
        const existing = await client_1.prisma.aCISession.findUnique({
            where: { appointmentId },
            include: { noteDraft: true, codingSuggestions: true },
        });
        if (existing)
            return existing;
        return client_1.prisma.aCISession.create({
            data: {
                hospitalId,
                appointmentId,
                doctorId,
                patientId,
            },
            include: { noteDraft: true, codingSuggestions: true },
        });
    }
    static async generateNoteAndCodes(sessionId) {
        const session = await client_1.prisma.aCISession.findUnique({ where: { id: sessionId } });
        if (!session)
            throw { statusCode: 404, message: 'ACI session not found.' };
        const diarized = [
            { speaker: 'Doctor', text: "Good morning Arthur! I see you've had precordial chest tightness." },
            { speaker: 'Patient', text: 'Yes doctor, started 3 days ago on stairs.' },
            { speaker: 'Doctor', text: 'Vitals show BP 120/80 mmHg. I will start Atorvastatin 20mg and order CBC.' },
        ];
        const entities = [
            { category: 'Symptom', value: 'Precordial chest tightness', confidence: 0.985 },
            { category: 'Vital', value: 'BP 120/80 mmHg', confidence: 0.992 },
            { category: 'Diagnosis', value: 'Angina Pectoris (I20.9)', confidence: 0.941 },
            { category: 'Medication', value: 'Atorvastatin 20mg PO nocte', confidence: 0.978 },
        ];
        await client_1.prisma.aCISession.update({
            where: { id: sessionId },
            data: {
                rawTranscript: 'Good morning Arthur! Precordial chest tightness on stairs. BP 120/80 mmHg. Starting Atorvastatin 20mg and CBC.',
                diarizedTranscript: diarized,
                extractedEntities: entities,
            },
        });
        const noteDraft = await client_1.prisma.clinicalNoteDraft.upsert({
            where: { aciSessionId: sessionId },
            update: {},
            create: {
                aciSessionId: sessionId,
                noteType: 'SOAP',
                chiefComplaint: 'Exertional chest tightness past 3 days.',
                subjective: '41-year-old male with intermittent precordial tightness during exertion.',
                objective: 'BP 120/80 mmHg, HR 72 bpm, SpO2 98%. Heart S1/S2 normal.',
                assessment: 'Suspected Stable Angina Pectoris (ICD-10 I20.9).',
                plan: '1. Atorvastatin 20mg PO nocte.\n2. Complete Blood Count (CBC) & Lipid Panel.\n3. Follow up in 7 days.',
                fullMarkdown: '# Ambient Clinical Note Draft\n\n**Subjective:** Exertional chest tightness.\n**Objective:** BP 120/80.\n**Assessment:** Angina Pectoris.\n**Plan:** Atorvastatin & CBC.',
            },
        });
        await client_1.prisma.codingSuggestion.deleteMany({ where: { aciSessionId: sessionId } });
        const codes = await client_1.prisma.codingSuggestion.createMany({
            data: [
                {
                    aciSessionId: sessionId,
                    codeSystem: 'ICD-10',
                    code: 'I20.9',
                    description: 'Angina pectoris, unspecified',
                    confidence: 0.9450,
                    evidence: 'precordial tightness when climbing stairs',
                },
                {
                    aciSessionId: sessionId,
                    codeSystem: 'CPT',
                    code: '99214',
                    description: 'Office or outpatient visit established patient (30-39 mins)',
                    confidence: 0.9600,
                    evidence: 'Detailed clinical evaluation & moderate MDM complexity',
                },
            ],
        });
        return client_1.prisma.aCISession.findUnique({
            where: { id: sessionId },
            include: { noteDraft: true, codingSuggestions: true, patient: true, doctor: { include: { user: true } } },
        });
    }
    static async doctorSignOff(sessionId) {
        await client_1.prisma.aCISession.update({
            where: { id: sessionId },
            data: { isSigned: true, signedAt: new Date() },
        });
        return client_1.prisma.clinicalNoteDraft.update({
            where: { aciSessionId: sessionId },
            data: { doctorApproved: true },
        });
    }
}
exports.ACIService = ACIService;
