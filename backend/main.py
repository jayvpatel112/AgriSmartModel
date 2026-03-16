from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib

# 1. Initialize FastAPI app
app = FastAPI(title="AgriSmart AI API")

# 2. CORS Setup (Taaki Next.js safely data fetch kar sake)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Development ke liye hum sab allow kar rahe hain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Load your trained model
model = joblib.load('/Users/jaykumarpatel/Practice ML /AgriSmartModel/agrismart_model.joblib')

# 4. Input data ka structure define karein (Pydantic use karke)
class SoilData(BaseModel):
    N: float
    P: float
    K: float
    ph: float

# 5. API Endpoint banayein
@app.post("/predict")
def predict_crop(data: SoilData):
    # Data ko 2D array format mein model ko bhejein
    input_features = [[data.N, data.P, data.K, data.ph]]
    
    # Model se guess karwayein
    prediction = model.predict(input_features)
    
    # Result wapas bhejein
    return {
        "success": True,
        "recommended_crop": prediction[0]
    }