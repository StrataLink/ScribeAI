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
    <div className="login-main">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <div className="user">
          <i className="fa fa-user"></i> 
          <div className="form-groupL">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
            </div>
          </div>
          <div className="spaceL"></div>
          <div className="user">
            <i className="fa fa-lock"></i> 
          <div className="form-groupL">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
            </div>
          </div>
          <div className="spaceL"></div>
          <button className="buttL" type="submit">
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
