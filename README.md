# Insight 📊🧠  
**Where data becomes decisions**

![Insight Banner](Banner.png)

---

## 🚀 Overview
Insight is an AI-powered market analysis tool that predicts short-term price movements and generates trading signals using machine learning and real-time market data.

It combines:
- Time-series prediction (Random Forest)
- Technical indicators (SMA, momentum, volatility)
- AI-generated explanations

---

## Demo
This demo requires the API server to be running locally on your machine at http://127.0.0.1:8000

[https://insight.adharvarun.tech](https://insight.adharvarun.tech)

## ✨ Features
- Next-step price prediction  
- BUY / SELL / HOLD signals  
- Natural language explanations (LLM-powered)  
- Technical feature engineering  
- Fast API backend  

---

## 🧠 How It Works
1. Fetch market data (yfinance)  
2. Clean and preprocess data  
3. Generate technical features  
4. Train ML model  
5. Predict next price  
6. Generate signal  
7. Explain results using AI  

---

## ⚙️ Tech Stack
- Backend: FastAPI / Python  
- ML: scikit-learn (Random Forest Regression Model)  
- Data: yfinance  
- AI: DeepSeek R1  
- Frontend: Next.js  

---

## 📦 Installation
```bash
git clone https://github.com/yourusername/insight.git  
cd insight  
pip install -r requirements.txt  
```

---

## ▶️ Usage
Run backend: 
```bash 
cd backend
uvicorn main:app --reload  
```

Run Frontend:
```bash
cd frontend
npm run dev  
```
---

API Endpoints

- POST `/predict/` - Predict Stock Price
- POST `/explain/` - Explain Prediction
- POST `/info/` - Current Info about Selected Symbol

FastAPI Docs Page (SwaggerUI) - `http://127.0.0.1:8000/docs/`

---

## ⚠️ Disclaimer
This project is for educational purposes only.  
Not financial advice.

---

## 📌 Future Improvements
- RSI / MACD indicators  
- Multi-agent analysis  
- Interactive charts  
- Simulated trading  

---

## 👤 Author
Built by Adharv Arun  

---

## ⭐ Contributing
Pull requests are welcome!
