# 🌱 AgriSmart AI: Intelligent Crop Recommendation Engine

## 📌 Overview
AgriSmart AI is a full-stack Machine Learning web application designed to recommend the optimal crop for cultivation based on essential soil metrics: Nitrogen (N), Phosphorous (P), Potassium (K), and pH levels. 

This project bridges the gap between data science and web engineering by serving a trained Scikit-Learn model through a RESTful FastAPI backend, which is seamlessly consumed by a modern, responsive Next.js frontend.

<img width="555" height="572" alt="Screenshot 2026-03-16 at 6 06 36 PM" src="https://github.com/user-attachments/assets/708682a8-f677-42e3-ab89-003ec9040cd2" />

## 🚀 Tech Stack
- **Machine Learning:** Python, Scikit-Learn, Pandas, Joblib
- **Backend API:** FastAPI, Uvicorn, Pydantic
- **Frontend:** Next.js, React, Tailwind CSS

## 🧠 The Machine Learning Model
- **Algorithm:** Multi-class Logistic Regression (`multi_class='multinomial'`).
- **Data & Scope:** Trained on an agricultural dataset classifying 22 unique crop types.
- **Evaluation:** Conducted feature selection analysis, identifying Potassium (K) as the single most crucial predictive feature (approx. 27% standalone accuracy) before training the final robust model on all four soil metrics.

## ⚙️ Local Setup & Installation

To run this project locally, you will need two terminal windows.

### 1. Start the Backend (FastAPI)
Navigate to the backend directory and run:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

cd frontend
npm install
npm run dev
