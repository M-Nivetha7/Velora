import { useNavigate } from "react-router-dom";
import FloatingBubbles from "../components/FloatingBubbles";
import "../styles/auth.css";

export default function Signup() {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <FloatingBubbles />
      <div className="card">
        <h2>Create Account</h2>
        <input placeholder="Email" />
        <input placeholder="Password" type="password" />
        <button onClick={() => navigate("/")}>Signup</button>
      </div>
    </div>
  );
}
