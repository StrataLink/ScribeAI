// LoginPage.tsx
import React, { useState } from "react"
import "./LoginPage.css" // Import your CSS file for styling
import { useNavigate } from "react-router-dom"


function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Implement your login logic here
  }

  const navigate = useNavigate()

  return (
    <div className="login-main">
      <div className="userL"><i className="fa fa-user-circle"></i></div>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-groupL">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-groupL">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={() => navigate("/main")}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
