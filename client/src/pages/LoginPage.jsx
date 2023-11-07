// LoginPage.tsx
import React, { useState, useEffect } from "react";
import "./LoginPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../utils/URL";

function LoginPage() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Implement your login logic here
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response && response.status === 200) {
        navigate("/main");
      }
    } catch (e) {
      console.error("Error:", e.response);
      alert(e.response.data.error);
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <button type="submit" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
