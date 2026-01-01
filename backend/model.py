import numpy as np
from collections import deque
import joblib

# Load the trained model once
model = joblib.load("risk_model.pkl")

# Keep your history for trend smoothing
history = deque(maxlen=10)

def predict_risk(data):
    movement = data.get("movement", 0)
    speed = data.get("speed", 0)
    location = data.get("location_risk", 0)
    hour = data.get("hour", 12)

    # Create feature vector for the model
    features = np.array([[movement / 10, speed / 8, location]])  # normalize movement & speed like before

    # Predict probability of risk
    risk_prob = model.predict_proba(features)[0][1]  # probability of class 1 (high risk)

    # Adjust slightly for night hours
    night_score = 1 if hour < 6 or hour > 21 else 0.3
    risk = 0.85 * risk_prob + 0.15 * night_score

    # Add history trend smoothing
    history.append(risk)
    if len(history) >= 5:
        trend = np.mean(list(history)[-5:])
        risk = (risk + trend) / 2

    return round(min(risk, 1), 2)
