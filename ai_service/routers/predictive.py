from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict

router = APIRouter()

class PredictiveRiskRequest(BaseModel):
    patient_id: str

class RiskModelItem(BaseModel):
    model_name: str
    risk_score_pct: float
    category: str
    shap_factors: Dict[str, str]

@router.post("/risk-scores", response_model=List[RiskModelItem])
async def get_predictive_risks(req: PredictiveRiskRequest):
    return [
        RiskModelItem(
            model_name="SEPSIS_RISK",
            risk_score_pct=14.2,
            category="LOW",
            shap_factors={"WBC Count": "+4%", "Body Temp": "+2%", "Heart Rate": "+3%"}
        ),
        RiskModelItem(
            model_name="30_DAY_READMISSION_RISK",
            risk_score_pct=18.5,
            category="LOW",
            shap_factors={"Previous Admissions": "+8%", "Age": "+5%", "Comorbidities": "+5.5%"}
        ),
        RiskModelItem(
            model_name="ICU_DETERIORATION_INDEX",
            risk_score_pct=8.1,
            category="LOW",
            shap_factors={"SpO2": "-2%", "Systolic BP": "+3%"}
        )
    ]
