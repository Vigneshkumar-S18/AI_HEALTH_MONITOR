from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class ACIProcessRequest(BaseModel):
    patient_id: str
    doctor_id: str
    audio_transcript_raw: Optional[str] = None

class EntityItem(BaseModel):
    category: str
    value: str
    confidence: float

class ACIProcessResponse(BaseModel):
    diarized_transcript: List[dict]
    extracted_entities: List[EntityItem]
    generated_soap: dict
    suggested_codes: List[dict]

@router.post("/process", response_model=ACIProcessResponse)
async def process_ambient_audio(req: ACIProcessRequest):
    # Simulated high-performance Clinical NLP & Diarization Pipeline
    diarized = [
        {"speaker": "Doctor", "text": "Good morning Arthur! I see you've had some precordial tightness when climbing stairs."},
        {"speaker": "Patient", "text": "Yes doctor, it started 3 days ago. It feels like heaviness in the center of my chest."},
        {"speaker": "Doctor", "text": "Any radiation to your jaw or left arm? And how is your blood pressure history?"},
        {"speaker": "Patient", "text": "No radiation to my arm. My BP was 120/80 mmHg this morning."},
        {"speaker": "Doctor", "text": "Alright, I'll order a Complete Blood Count and start Atorvastatin 20mg."}
    ]

    entities = [
        EntityItem(category="Symptom", value="Precordial chest heaviness on exertion", confidence=0.985),
        EntityItem(category="Vital", value="BP 120/80 mmHg", confidence=0.992),
        EntityItem(category="Diagnosis", value="Angina Pectoris (I20.9)", confidence=0.941),
        EntityItem(category="Medication", value="Atorvastatin 20mg PO nocte", confidence=0.978),
        EntityItem(category="Lab Test", value="Complete Blood Count (CBC)", confidence=0.965)
    ]

    soap = {
        "chief_complaint": "Exertional chest heaviness past 3 days.",
        "subjective": "41-year-old male presents with intermittent precordial tightness during physical exertion. Denies radiation to jaw/arm. No diaphoresis.",
        "objective": "Vitals: BP 120/80 mmHg, HR 72 bpm, SpO2 98%. Normal S1/S2 heart sounds, no murmur.",
        "assessment": "Suspected Stable Angina Pectoris (ICD-10 I20.9).",
        "plan": "1. Start Atorvastatin 20mg PO at bedtime.\n2. Order Complete Blood Count (CBC) & Lipid Panel.\n3. Return for follow-up in 7 days."
    }

    codes = [
        {"code_system": "ICD-10", "code": "I20.9", "description": "Angina pectoris, unspecified", "confidence": 0.945, "evidence": "precordial tightness when climbing stairs"},
        {"code_system": "CPT", "code": "99214", "description": "Office or outpatient visit for established patient (30-39 mins)", "confidence": 0.960, "evidence": "Detailed clinical history & moderate complexity MDM"}
    ]

    return ACIProcessResponse(
        diarized_transcript=diarized,
        extracted_entities=entities,
        generated_soap=soap,
        suggested_codes=codes
    )
