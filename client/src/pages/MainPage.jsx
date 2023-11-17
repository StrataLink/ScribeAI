import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../utils/URL";
import "./MainPage.css";
import Sidebar from "../components/Sidebar";

const MainPage = (props) => {
  // Use state variables: fill empty with separate components.
  const navigate = useNavigate();
  const [live, setLive] = useState(true);
  const [profileView, setProfileView] = useState();
  const [colorView, setColorView] = useState();
  const [subView, setSubView] = useState();
  const [tooltip, setTooltip] = useState();
  const [entries, setEntries] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const populateUserInfo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/user/profile",
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status != 200) {
        throw new Error("Not logged in.");
      } else {
        setUser(response.data.user);
        await fetchEntries();
      }
    } catch (e) {
      if (e.message === "Not logged in.") {
        navigate("/login");
      } else {
        console.error("An rror occurred.");
        navigate("/");
      }
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/entry/get-entries`, {
        withCredentials: true,
      });
      setEntries(response.data.data);
      setLoading(false);
    } catch (e) {
      console.error("Frontend error fetching entries. Error Message:", e);
    }
  };

  useEffect(() => {
    populateUserInfo();
  }, []);

    const createEntry = async (userRef) => {
      // mongo logic - add new entry to collection: entries in DB.
      // database forEach loop will handle CSS/frontend display - medium
      try {
        const response = await axios.post(`${apiURL}/api/entry/add-entry`, {
            user: userRef,
            title: "Untitled Entry" // todo, make alliteration later?
        });
        setEntries(prevEntries => [...prevEntries, response.data.data]); // need to sort in map based on last updated?
      }
      catch (e) {
        console.error("Failed to create a new entry. Error Message:", e);
      }
    };

  /* handleSideBar function is on-hold until further notice, to be done in Sidebar component. */
  
  // archaic function decl. Jason's task.
  const handleEntry = () => {
    // change entryView useState variable - easy.
  };
  // on-hold.
  const handleBookMark = () => {
    // mongo logic - add boolean to entry so star shows up (important) - easy
  };
  
  // Jason.
  const handleRecord = () => {
    // logic - check live boolean, based on that to preprocessing - then display on frontend, main text - hard
  };
  
  // Jason.
  const handleLiveRecording = () => {
    // switch boolean to true if false, easy.
  };

  // on-hold.
  const handleVideoRecording = () => {
    // switch boolean to false if true, easy.
  };
  
  // on-hold.
  const handleToolTip = () => {
    // change tooltip boolean, show tooltip in middle of the screen. (disable tooltip when display div.), easy
  };

  // pass to Sidebar, Ryan's task.
  const handleProfile = (userRef) => {
    // logic - render profile component (pull from DB based on current user) - medium/hard
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="main-wrapper">
          {/* add sidebar component -> map individual entries with changeable names. */}
          {console.log(entries)}
          <Sidebar entries={entries} createFunc={() => createEntry(user)} profileFunc={() => handleProfile(user)}  />
          {/* add entryview component */}
          {/* add sub, color, profile, and tooltip view here. */}
        </div>
      )}
    </>
  );
};

export default MainPage;
