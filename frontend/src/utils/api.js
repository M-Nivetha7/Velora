const API_URL = "http://127.0.0.1:5001";

export async function getRiskPrediction(payload) {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return response.json();
}
