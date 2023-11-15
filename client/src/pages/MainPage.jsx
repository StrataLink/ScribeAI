import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./MainPage.css";

const MainPage = (props) => {

    // Use state variables: fill empty with separate components.
    const [live, setLive] = useState(true);
    const [profileView, setProfileView] = useState();
    const [colorView, setColorView] = useState();
    const [subView, setSubView] = useState();
    const [tooltip, setTooltip] = useState();
    const [entries, setEntries] = useState([]);
    
    const createEntry = () => {
        // mongo logic - add new entry to collection: entries in DB.
        // database forEach loop will handle CSS/frontend display - medium
    }

    const handleSideBar = () => {
        // sidebar div will have built in transition (sec), shift absolute position
        // when click back and forth. starts as extended sidebar - medium
    }

    const handleEntry = () => {
        // change entryView useState variable - easy.
    }

    const handleBookMark = () => {
        // mongo logic - add boolean to entry so star shows up (important) - easy
    }

    const handleRecord = () => {
        // logic - check live boolean, based on that to preprocessing - then display on frontend, main text - hard
    }

    const handleLiveRecording = () => {
        // switch boolean to true if false, easy.
    }

    const handleVideoRecording = () => {
        // switch boolean to false if true, easy.
    }

    const handleToolTip = () => {
        // change tooltip boolean, show tooltip in middle of the screen. (disable tooltip when display div.), easy
    }

    const handleProfile = () => {
        // logic - render profile component (pull from DB based on current user) - medium/hard
    }

    return (
        <>
            {/* add sidebar component -> map individual entries with changeable names. */}
            {/* add entryview component */}
            {/* add sub, color, profile, and tooltip view here. */}
        </>
    )
}

export default MainPage;