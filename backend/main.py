from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from model import run_pipeline
from agent import explain_prediction
import yfinance as yf

app = FastAPI(title="Insight Stock Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache = {}

class PredictionBody(BaseModel):
    symbol: str

class AgentBody(BaseModel):
    symbol: str

@app.post("/predict")
def predict(body: PredictionBody):
    symbol = body.symbol

    signal, prediction, evaluation = run_pipeline(symbol)

    cache[symbol] = {
        "signal": signal,
        "prediction": prediction,
        "evaluation": evaluation
    }

    return {
        "symbol": symbol,
        "signal": signal,
        "prediction": prediction,
        "evaluation": evaluation
    }

@app.post("/explain")
def explain(body: AgentBody):
    symbol = body.symbol

    if symbol not in cache:
        raise HTTPException(status_code=404, detail="Run /predict first")

    data = cache[symbol]

    explanation = explain_prediction(
        symbol,
        data["signal"],
        data["prediction"],
        data["evaluation"]
    )

    return explanation

@app.post("/info")  
def info(body: PredictionBody):
    ticker = yf.Ticker(body.symbol)

    info = ticker.get_info()
    hist = ticker.history(period="1d", interval="1m")

    latest = hist.iloc[-1] if not hist.empty else None

    snapshot = {
        "symbol": body.symbol,
        "companyName": info.get("longName"),
        "currentPrice": f"${latest['Close']:.2f}" if latest is not None else None,
        "priceChange": None,
        "open": f"${latest['Open']:.2f}" if latest is not None else None,
        "high": f"${latest['High']:.2f}" if latest is not None else None,
        "low": f"${latest['Low']:.2f}" if latest is not None else None,
        "volume": f"{latest['Volume']:,}" if latest is not None else None,
        "marketCap": f"${info.get('marketCap'):,}" if info.get("marketCap") else None,
    }

    if latest is not None and len(hist) > 1:
        prev_close = hist.iloc[0]["Close"]
        change_pct = ((latest["Close"] - prev_close) / prev_close) * 100
        snapshot["priceChange"] = f"{change_pct:.2f}%"

    return [snapshot]