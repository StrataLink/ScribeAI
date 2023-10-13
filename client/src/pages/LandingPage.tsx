import React, {useRef} from "react";
import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Laptop from "../images/Laptop.svg";


function LandingPage() {
const target = useRef<HTMLDivElement>(null);

    const scroll = () => {
        if (target.current){
          target.current.scrollIntoView({behavior: 'smooth'});
        }
    }
    const navigate = useNavigate()
    /*const Laptop = require("../../public/Laptop.svg") as string;*/
  return (
    <div className="landing-container">
      <Navbar onScroll={scroll}/>
      
      <header >
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

        <div ref={target} className="need-da-space">
        </div>
        <div className="Part2">
        <h2 className="h2"> How does it work?</h2>
        <p className="p">It's pretty simple.</p>
        <p className="p2"> Click the record button to transform live speech into text, all in real time.</p>
        <p className="p2"> Then, our state-of-the-art tech will summarize the text, all while keeping important key points. </p>
        <div className="box1"> </div>
        </div>

        

        <div className="Part2p2">
        <h2 className="h2"> Use to Scribe Anywhere</h2>
        <p className="p">Yes! Anywhere!</p>
        <p className="p2"> Whether you’re in a large seminar, a small class, or in a one-on-one setting, Scribe will get the job done.</p>
        <div className="box2"></div>
        </div>

        <div className="Part2p3">
        <h2 className="h2"> Need to Catch up?</h2>
        <p className="p">We've got your back.</p>
        <p className="p2">Scribe also works with prerecorded videos, so you can catch up on your lectures.</p>
        <p className="p2">We also store your previous recordings, so you can always refer to your notes.</p>
        <div className="box3"></div>
        </div>

        <button className="register-button" onClick={() => navigate("/register")}>Register</button>
        <button className="login-button" onClick={() => navigate("/login")}>Login</button>
      </section>
    </div>
    
  );
}

export default LandingPage;
