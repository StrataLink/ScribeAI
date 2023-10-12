import React from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Laptop from "../images/Laptop.svg";


function LandingPage() {
    const navigate = useNavigate()
    /*const Laptop = require("../../public/Laptop.svg") as string;*/
  return (
    <div className="landing-container">
      <Navbar/>
      <header>
        <h1>Innovate your note-taking experience</h1>

        <section>
        <p>
          The go-to platform for taking notes
        </p>
        <p className="smalltxt">
          Convert speech to meaningful text summaries
        </p>

      </section>
      <img style={{width: 800, height: 800}} src={Laptop} alt="imgLaptop" className='imgLaptop'/>
      <div className="shadow">.</div>
      </header> 
      <section>
        <button className="cta-button">Get Started</button>

        <div className="Part2">
        <h2 className="h2"> How does it work?</h2>
        <p className="p">It's pretty simple.</p>
        <p className="p2"> Click the record button to transform live speech into text, all in real time.</p>
        <p className="p2"> Then, our state-of-the-art tech will summarize the text, all while keeping important key points. </p>
        <div className="box1"> </div>
        </div>
        <button className="register-button" onClick={() => navigate("/register")}>Register</button>
        <button className="login-button" onClick={() => navigate("/login")}>Login</button>
      </section>
    </div>
    
  );
}

export default LandingPage;
