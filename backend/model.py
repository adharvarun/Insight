import yfinance as yf
import pandas as pd
import numpy as np
from sklearn import metrics
from sklearn.ensemble import RandomForestRegressor

def download_stock_data(symbol):
    return yf.download(symbol, period="4mo", interval="1h")

def clean_data(df: pd.DataFrame):
    df.columns = df.columns.get_level_values(0)
    df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
    df = df.drop_duplicates()
    df = df.sort_index()
    df = df.dropna()
    Q1 = df['Close'].quantile(0.25)
    Q3 = df['Close'].quantile(0.75)
    IQR = Q3 - Q1
    lower_bound = Q1 - 0.5 * IQR
    upper_bound = Q3 + 0.5 * IQR
    df = df[(df['Close'] >= lower_bound) & (df['Close'] <= upper_bound)]
    df = df.dropna()
    df = df.reset_index(drop=True)
    return df

def add_features(df: pd.DataFrame):
    df['SMA10'] = df['Close'].rolling(window=10).mean()
    df['SMA20'] = df['Close'].rolling(window=20).mean()
    df['SMA50'] = df['Close'].rolling(window=50).mean()
    df['Close_SMA10_diff'] = df['Close'] - df['SMA10']
    df['Close_SMA50_diff'] = df['Close'] - df['SMA50']
    df['SMA10_20_diff'] = df['SMA10'] - df['SMA20']
    df['SMA20_50_diff'] = df['SMA20'] - df['SMA50']
    df['Volatility'] = df['High'] - df['Low']
    df['Price_Change'] = df['Close'].diff()

    df = df.dropna()
    return df

def create_target(df: pd.DataFrame):
    df['Target'] = df['Close'].shift(-1)
    
    df = df.dropna()
    return df

def prepare_data(df: pd.DataFrame):
    X = df.drop('Target', axis=1)
    Y = df['Target']

    split_index = int(len(df) * 0.8)

    X_train = X[:split_index]
    X_test = X[split_index:]
    Y_train = Y[:split_index]
    Y_test = Y[split_index:]

    return X_train, X_test, Y_train, Y_test

def train_model(X_train, Y_train):
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, Y_train)

    return model

def predict_next(model, df: pd.DataFrame):
    last_row = df.drop('Target', axis=1).iloc[[-1]]  
    prediction = model.predict(last_row)

    return f"{prediction[0]:.2f}"

def generate_signal(df: pd.DataFrame):
    if df['Close'].iloc[-1] > df['SMA10'].iloc[-1] and df['SMA10'].iloc[-1] > df['SMA20'].iloc[-1]:
        return "Buy"
    elif df['Close'].iloc[-1] < df['SMA10'].iloc[-1] and df['SMA10'].iloc[-1] < df['SMA20'].iloc[-1]:
        return "Sell"
    else:
        return "Hold"
    
def evaluate_model(model, X_test, Y_test):
    Y_pred = model.predict(X_test)
    mae = metrics.mean_absolute_error(Y_test, Y_pred)
    mse = metrics.mean_squared_error(Y_test, Y_pred)
    rmse = np.sqrt(mse)
    r2 = metrics.r2_score(Y_test, Y_pred)
    
    results = {
        'mae': f"{mae:.2f}",
        'mse': f"{mse:.2f}",
        'rmse': f"{rmse:.2f}",
        'r2': f"{r2:.2f}"
    }

    return results

def run_pipeline(symbol):
    df: pd.DataFrame = download_stock_data(symbol)
    df = clean_data(df)
    df = add_features(df)
    df = create_target(df)
    X_train, X_test, Y_train, Y_test = prepare_data(df)
    model = train_model(X_train, Y_train)
    prediction = predict_next(model, df)
    signal = generate_signal(df)
    evaluation = evaluate_model(model, X_test, Y_test)

    return signal, prediction, evaluation