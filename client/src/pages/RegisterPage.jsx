// RegisterPage.tsx
import React, { useState } from "react"
import "./RegisterPage.css" // Import your CSS file for styling
import { useNavigate } from "react-router-dom"

function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleRegister = () => {
    // Implement your registration logic here
  }
  const navigate = useNavigate()

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
  )
}

export default RegisterPage
