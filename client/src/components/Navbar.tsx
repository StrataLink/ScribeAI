import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import "./Navbar.css"

function Navbar() {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
        <div className="navbar-container">
            <Link to="/" className="navbar-logo"onClick={closeMobileMenu}>
                ScribeAI
            </Link>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                        Start
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/About" className="nav-links" onClick={closeMobileMenu}>
                        About
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/Pricing" className="nav-links" onClick={closeMobileMenu}>
                        Pricing
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar