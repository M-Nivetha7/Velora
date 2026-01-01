import numpy as np
from sklearn.linear_model import LogisticRegression
import joblib

X = np.random.rand(500, 3)
y = (X.sum(axis=1) > 1.5).astype(int)

model = LogisticRegression()
model.fit(X, y)

joblib.dump(model, "risk_model.pkl")

print("risk_model.pkl created successfully")
