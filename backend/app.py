from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict_risk

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    risk = predict_risk(data)
    return jsonify({"risk": risk})

if __name__ == "__main__":
    app.run(debug=True, port=5001)
