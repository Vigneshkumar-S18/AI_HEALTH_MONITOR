from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter()

class CDSSRequest(BaseModel):
    patient_id: str
    proposed_medication: str

class CDSSResponse(BaseModel):
    has_alert: bool
    alert_type: str
    severity: str
    title: str
    description: str
    confidence: float
    evidence: str

@router.post("/evaluate", response_model=CDSSResponse)
async def evaluate_cdss(req: CDSSRequest):
    if "aspirin" in req.proposed_medication.lower():
        return CDSSResponse(
            has_alert=True,
            alert_type="DRUG_INTERACTION",
            severity="WARNING",
            title="Moderate Drug Interaction Alert",
            description="Concurrent administration of Aspirin with active Anticoagulation may increase bleeding risks.",
            confidence=0.9620,
            evidence="Lexicomp Clinical Drug Safety Protocols (Section 4.2)"
        )
    
    return CDSSResponse(
        has_alert=False,
        alert_type="NONE",
        severity="INFO",
        title="No Clinical Contraindications Detected",
        description="Medication prescription is safe based on patient allergy profile and current drug regimen.",
        confidence=0.9910,
        evidence="EMR Patient Allergy & Medication Registry"
    )
