// LoginPage.tsx
import React, { useState } from "react";
import "./LoginPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../utils/URL";

function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    // Implement your login logic here
    e.preventDefault();
    console.log("hello");
    try {
      const response = await axios.post(
        `${apiURL}/api/auth/login`,
        {
          name,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response", response);
      if (response && response.status === 200) {
        navigate("/main");
      }
    } catch (error) {
      console.error("Error:", error.response);
      alert("Incorrect email and/or password.");
    }
  };

  return (
    <div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
