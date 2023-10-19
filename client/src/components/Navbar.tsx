import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import "./Navbar.css"

interface NavbarProps{
    onScroll: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({onScroll}) => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <button className="navbar-logo" onClick={() => onScroll('introduction')}>
                ScribeAI
            </button>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                        Start
                    </Link>
                </li>
                <li className="nav-item">
                    <button className="butt" onClick={() => onScroll('about')}>
                        About
                    </button>
                </li>
                <li className="nav-item">
                <button className="butt" onClick={() => onScroll('pricing')}>
                        Pricing
                    </button>
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default Navbar