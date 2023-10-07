import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";


function LandingPage() {
    const Laptop = require("../images/Laptop.svg") as string;
    const navigate = useNavigate()
  return (
    <div className="landing-container">
      <Navbar/>
      <header>
        <h1>Innovate your note-taking experience</h1>

        <section>
        <p>
          The go-to platform for taking notes
        </p>
        <span>
          Convert speech to meaningful text summaries
        </span>
      </section>
      <img style={{width: 500, height: 300}} src={Laptop} alt="imgLaptop" className='imgLaptop'/>
      <div className="shadow">.</div>
      </header> 
      <section>
        <button className="cta-button">Get Started</button>
        <button className="register-button" onClick={() => navigate("/register")}>Register</button>
        <button className="login-button" onClick={() => navigate("/login")}>Login</button>
      </section>
    </div>
    
  );
}

export default LandingPage;
