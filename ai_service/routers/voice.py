from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class VoiceCommandRequest(BaseModel):
    transcript: str

class VoiceCommandResponse(BaseModel):
    intent: str
    target_route: str
    confidence: float
    parameters: dict

@router.post("/parse", response_model=VoiceCommandResponse)
async def parse_voice_command(req: VoiceCommandRequest):
    t_lower = req.transcript.lower()

    if "cbc" in t_lower or "blood test" in t_lower:
        return VoiceCommandResponse(
            intent="ORDER_LAB_TEST",
            target_route="/lab",
            confidence=0.985,
            parameters={"test_code": "LAB-CBC-01", "test_name": "Complete Blood Count"}
        )
    elif "mri" in t_lower or "imaging" in t_lower:
        return VoiceCommandResponse(
            intent="OPEN_RADIOLOGY",
            target_route="/lab",
            confidence=0.970,
            parameters={"modality": "MRI"}
        )
    elif "next patient" in t_lower or "queue" in t_lower:
        return VoiceCommandResponse(
            intent="NEXT_PATIENT",
            target_route="/doctor/queue",
            confidence=0.990,
            parameters={}
        )
    else:
        return VoiceCommandResponse(
            intent="NAVIGATE_DASHBOARD",
            target_route="/dashboard",
            confidence=0.950,
            parameters={}
        )
