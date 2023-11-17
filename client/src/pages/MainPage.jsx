import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../utils/URL";
import "./MainPage.css";
import Sidebar from "../components/Sidebar";
import Entry from "../components/Entry";

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
  const { entryCode } = useParams();

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
        setUser(response.data.user.name);
        await fetchEntries();
      }
    } catch (e) {
      if (e.message === "Not logged in.") {
        navigate("/login");
      } else {
        console.error("An Error occurred.");
        navigate("/");
      }
    }
  };

  const fetchEntries = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/api/entry/get-entries",
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setEntries(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Frontend error fetching entries. Error Message:", error);
    }
  };

  useEffect(() => {
    populateUserInfo();
  }, []);

  const createEntry = async () => {
    // mongo logic - add new entry to collection: entries in DB.
    // database forEach loop will handle CSS/frontend display - medium
    try {
      const response = await fetch(
        "http://localhost:3001/api/entry/add-entry",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: "Untitled Title",
          }),
        }
      );
      const data = await response.json();
      setEntries((prevEntries) => [...prevEntries, data.data]); // need to sort in map based on last updated?
      navigate(`/main/${data.data._id}`);
    } catch (e) {
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
          <Sidebar
            entries={entries}
            setEntries={setEntries}
            createFunc={() => createEntry()}
            profileFunc={() => handleProfile(user)}
            user = {user}
          />

          <Entry setEntries={setEntries} entryCode={entryCode} />
          {/* Assuming you have a user display component */}
        </div>
      )}
    </>
  );
};

export default MainPage;
