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
    console.log("sanity check");
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
      console.log(response.status);
      console.log(response);
      if ((response && response.status === 200) || response.status === 304) {
        if (password === confirmPassword) {
          navigate("/login");
        } else {
          alert("Confirmed password is different from password.");
        }
      }
    } catch (error) {
      console.error("Error:", error.response);
      alert("Try again.");
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
