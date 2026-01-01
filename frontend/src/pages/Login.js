import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FloatingBubbles from "../components/FloatingBubbles";
import "../styles/auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <FloatingBubbles />
      <div className="card">
        <h2>Velora Login</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}
