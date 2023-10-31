import React, {useState} from 'react';
import "./Foot.css"
import { useNavigate } from "react-router-dom"

function Foot({onScroll}) {
    const navigate = useNavigate()

  return (
    <div>
         <div className = 'foot'>
            <div className="g1">
              <p className='p5'>want to help?</p>
              <p className='p5'>we're now open source!</p>
              <p className='p5' style={{color: 'lightblue'}}>link to our repo</p>
              <p className='p5'>MIT License, StrataLink 2023</p>
            </div>
            <div className="g2">
              <h1 className="h5">ScribeAI</h1>
              <li className='listt'>
                <button
                    className="butt2"
                    onClick={() => navigate("/login")}
                >Start</button>
              </li>
              <li className='listt'>
                <button className="butt2" onClick={() => onScroll("about")}>
                About
                </button>
            </li>
            <li className='listt'>
                <button className="butt2" onClick={() => onScroll("pricing")}>
                Pricing
                </button>
            </li>
            </div>
            <div className="g3">
              <h1 className="h5">Contacts
                <div className="brands">
                  <i className="fa fa-envelope"></i>  <i className="fa fa-instagram"></i>   <i className="fa fa-linkedin-square"></i>   <i className="fa fa-facebook-square"></i>
                  </div>
              </h1>
            </div>
        </div>
    </div>
  )
}

export default Foot