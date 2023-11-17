// RegisterPage.tsx
import React, { useState, useEffect } from "react";
import "./RegisterPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../utils/URL";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    // Implement your registration logic here
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiURL}/api/auth/register`,
        {
          name,
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
      if ((response && response.status === 200) || response.status === 304) {
        if (password === confirmPassword) {
          navigate("/login");
        } else {
          alert("Confirmed password is different from password.");
        }
      }
    } catch (e) {
      console.error("Error:", e.response);
      alert(e.response.data.error);
    }
  };

  return (
    <div className="register-main">
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="userR">
          <i className="fa fa-envelope"></i>         
        <div className="form-groupR">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        </div>
        <div className="userR">
          <i className="fa fa fa-unlock-alt"></i>
        <div className="form-groupR">
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>
        </div>
        <div className="userR">
          <i className="fa fa-lock"></i>
        <div className="form-groupR">
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm Password"
          />
        </div>
        </div>
        <button type="submit" onClick={() => navigate("/login")}>
          Register
        </button>
      </form>
    </div>
    </div>
  );
}

export default RegisterPage;
