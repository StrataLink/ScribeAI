import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function LandingPage() {
    const navigate = useNavigate()
  return (
    <div className="landing-container">
      <Navbar/>
      <header>
        <h1>Welcome to Our Website</h1>
      </header>
      <section>
        <p>
          Hello
        </p>
      </section>
      <section>
        <button className="cta-button">Get Started</button>
        <button className="register-button" onClick={() => navigate("/register")}>Register</button>
        <button className="login-button" onClick={() => navigate("/login")}>Login</button>
      </section>
    </div>
    
  );
}

export default LandingPage;
