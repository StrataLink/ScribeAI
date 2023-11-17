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
          <button className="buttL" type="submit" onClick={() => navigate("/main")}>
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
