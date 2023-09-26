// LoginPage.tsx
import React, { FormEventHandler, useState } from "react";
import "./LoginPage.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setErrorMessage("");
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // Implement your login logic here
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        //alert(data.message);
        navigate("/");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error); // Set error message in state
      }
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="stratalink@gmail.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="skyisthelimit27"
            required
          />
        </div>
        <button type="submit" onClick={() => navigate("/main")}>Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
