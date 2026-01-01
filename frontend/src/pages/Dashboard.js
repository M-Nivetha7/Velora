import React, { useEffect, useState } from "react";
import { getRiskPrediction } from "../utils/api";
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [risk, setRisk] = useState(0);
  const [status, setStatus] = useState("Initializing");
  const [analysis, setAnalysis] = useState("Initializing sensors...");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const interval = setInterval(fetchRisk, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchRisk = async () => {
    const now = new Date();

    const payload = {
      movement: Math.random() * 8 + 2,
      speed: Math.random() * 6 + 1,
      location_risk: Math.random() > 0.75 ? 0.8 : 0.3,
      hour: now.getHours()
    };

    try {
      const res = await getRiskPrediction(payload);
      const r = res.risk;

      setRisk(r);

      setHistory(prev => [
        ...prev.slice(-9),
        { time: now.toLocaleTimeString(), risk: r * 100 }
      ]);

      if (r < 0.3) {
        setStatus("SAFE");
        setAnalysis("Movement and location patterns appear normal.");
      } else if (r < 0.6) {
        setStatus("ALERT");
        setAnalysis("Unusual activity detected. Stay aware of surroundings.");
      } else {
        setStatus("DANGER");
        setAnalysis("High risk detected. Consider contacting trusted person.");
      }

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard">
      <h1>Velora Live Safety Monitor</h1>

      <div className={`status ${status.toLowerCase()}`}>
        {status}
      </div>

      <h2>{Math.round(risk * 100)}% Risk Level</h2>
      <p className="analysis">{analysis}</p>

      <div className="charts">
        <LineChart width={520} height={260} data={history}>
          <XAxis dataKey="time" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line dataKey="risk" strokeWidth={3} />
        </LineChart>

        <PieChart width={280} height={280}>
          <Pie
            data={[
              { name: "Safe", value: 100 - risk * 100 },
              { name: "Risk", value: risk * 100 }
            ]}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
          >
            <Cell fill="#2ecc71" />
            <Cell fill="#e74c3c" />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}
