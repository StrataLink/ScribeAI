import React, { useRef } from "react"
import "./LandingPage.css"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import Laptop from "../images/Laptop.svg"
import BottomScroll from "../components/BottomScroll"
import Foot from "../components/Foot"

function LandingPage() {
  const intro = useRef(null)
  const about = useRef(null)
  const pricing = useRef(null)

  const scroll = id => {
    const targetE = document.getElementById(id)
    if (targetE) {
      targetE.scrollIntoView({ behavior: "smooth" })
    }
  }
  const navigate = useNavigate()
  /*const Laptop = require("../../public/Laptop.svg") as string;*/
  return (
    <div className="landing-container">
      <BottomScroll onScroll={scroll}/>
      <Navbar onScroll={scroll} />
      <header ref={intro} id="introduction">
        <h1>Innovate your note-taking experience</h1>
        <section>
          <p>The go-to platform for taking notes</p>
          <p className="smalltxt">
            Convert speech to meaningful text summaries
          </p>
        </section>
        <img
          src={Laptop}
          alt="imgLaptop"
          className="imgLaptop"
        />
        <div className="shadow"></div>
      </header>
      <section>
        <button className="cta-button" onClick={() => navigate("/login")}>
          Get Started
        </button>

        <div ref={about} id="about" className="need-da-space"></div>
        <div className="Part2">
          <h2 className="h2"> How does it work?</h2>
          <p className="p">It's pretty simple.</p>
          <p className="p2">
            {" "}
            Click the record button to transform live speech into text, all in
            real time.
          </p>
          <p className="p2">
            {" "}
            Then, our state-of-the-art tech will summarize the text, all while
            keeping important key points.{" "}
          </p>
          <div className="box1"> </div>
        </div>

        <div className="Part2p2">
          <h2 className="h2"> Use to Scribe Anywhere</h2>
          <p className="p">Yes! Anywhere!</p>
          <p className="p2">
            {" "}
            Whether you’re in a large seminar, a small class, or in a one-on-one
            setting, Scribe will get the job done.
          </p>
          <div className="box2"></div>
        </div>

        <div className="Part2p3">
          <h2 className="h2"> Need to Catch up?</h2>
          <p className="p">We've got your back.</p>
          <p className="p2">
            Scribe also works with prerecorded videos, so you can catch up on
            your lectures.
          </p>
          <p className="p2">
            We also store your previous recordings, so you can always refer to
            your notes.
          </p>
          <div className="box3"></div>
        </div>

        <div ref={pricing} id="pricing" className="pricing">
          {" "}
        </div>
        <div className="Part3">
          <div className="h3">Pick a Plan</div>
          <p className="p3">Unleash the power of ScribeAI today.</p>
          <div className="whbox">
            <div className="whbox1">
              <h4 className="h4">Student</h4>
              <p className="p4">The basic plan for all students.</p>
              <div className="money">
                $0
                <div className="pmonth"> /MO</div>
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> 20
                real-time speech-to-text uses. *
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> Full
                access to summarization tool.
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> 20
                speech saves a month.
              </div>
              <button
                className="getStarted1"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
              <div className="tinytxt">*User has to watch an advertisement after 20 uses in a month. </div>
            </div>

            <div className="whbox2">
              <h4 className="h4"> Student+</h4>
              <p className="p4">Unlimited real-time speech to text.</p>
              <div className="money">
                $5
                <div className="pmonth"> /MO</div>
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i>{" "}
                Unlimited real-time speech-to-text
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> 200
                minutes of prerecorded speech-to-text.
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> 100
                speech saves a month.
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> No
                advertisements. Ever.
              </div>
              <button
                className="getStarted2"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>

            <div className="whbox3">
              <h4 className="h4"> Student Pro</h4>
              <p className="p4">Limitless access to everything.</p>
              <div className="money">
                $10
                <div className="pmonth"> /MO</div>
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> All
                benefits from Student+.
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i>{" "}
                Unlimited real-time speech-to-text
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i>{" "}
                Unlimited prerecorded speech-to-text
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> 300
                speech saves a month.
              </div>
              <div className="chlist">
                <i className="fa fa-check" style={{ color: "green" }}></i> More
                perks coming soon!
              </div>
              <button
                className="getStarted3"
                onClick={() => navigate("/login")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      <Foot onScroll={scroll} ></Foot>

      </section>
    </div>
  )
}

export default LandingPage
