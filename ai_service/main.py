from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import ambient, cdss, predictive, vision, voice

app = FastAPI(
    title="MedFlow AI - Phase 3 ACI Microservice",
    description="Python FastAPI Ambient Clinical Intelligence & Healthcare ML Service",
    version="3.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(ambient.router, prefix="/api/v1/ai/ambient", tags=["Ambient Audio Scribe"])
app.include_router(cdss.router, prefix="/api/v1/ai/cdss", tags=["Clinical Decision Support"])
app.include_router(predictive.router, prefix="/api/v1/ai/predictive", tags=["Predictive Analytics"])
app.include_router(vision.router, prefix="/api/v1/ai/vision", tags=["Computer Vision"])
app.include_router(voice.router, prefix="/api/v1/ai/voice", tags=["Voice Assistant"])

@app.get("/health")
async def health_check():
    return {
        "status": "HEALTHY",
        "service": "MedFlow AI Python Microservice",
        "phase": 3,
        "cuda_available": False
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
