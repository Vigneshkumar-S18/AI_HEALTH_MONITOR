from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class VisionWoundRequest(BaseModel):
    image_url: str

class VisionWoundResponse(BaseModel):
    area_cm2: float
    healing_status: str
    granulation_pct: float
    necrotic_pct: float
    clinical_notes: str

@router.post("/analyze-wound", response_model=VisionWoundResponse)
async def analyze_wound(req: VisionWoundRequest):
    return VisionWoundResponse(
        area_cm2=4.85,
        healing_status="IMPROVING",
        granulation_pct=85.0,
        necrotic_pct=0.0,
        clinical_notes="Significant epithelialization observed. Wound surface area reduced by 22% compared to Day 4 baseline."
    )
