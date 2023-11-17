import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import "./Entry.css";
import microphoneIcon from "../images/microphoneIcon.png";
import stopIcon from "../images/stopRecording.png"; // make sure to add an icon for stopping the recording
import ScribeIcon from "../images/ScribeIcon.png";
import BrainIcon from "../images/BrainIcon.png";

const Entry = ({ setEntries, entryCode }) => {
  const [initial, setInitial] = useState(true);
  const [title, setTitle] = useState("Untitled");
  const [text, setText] = useState("");
  const textRef = useRef(""); // useRef to keep track of the current text without causing re-renders
  const [socket, setSocket] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeButton, setActiveButton] = useState('Scribe');
  const intervalRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (entryCode) {
      getEntryData();
    } else {
      setInitial(true);
      setTitle("Untitled");
      setText("Start");
    }
  }, [entryCode]); // Add entryCode as a dependency

  const getEntryData = async () => {
    if (entryCode) {
      try {
        const response = await fetch(
          `http://localhost:3001/api/entry/${entryCode}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await response.json();
        setInitial(false);
        setTitle(data.title);
        textRef.current = data.rawDesc;
        setText(textRef.current);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/entry/update-entry/${entryCode}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text: text }),
        }
      );
      const data = await res.json();
      console.log(data);
    } catch (error) {
      // Handle error (e.g., show error message, log the error, etc.)
      console.error("Error getting room:", error);
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0 && socket) {
      socket.emit("transcribeAudio", event.data);
    }
  };

  const startNewRecorder = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        recorder.ondataavailable = handleDataAvailable;
        recorder.start();
        // Stop recording after a short duration
        setTimeout(() => {
          recorder.stop();
          stream.getTracks().forEach((track) => track.stop());
        }, 5000); // Adjust this duration as needed
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const appendText = (newData) => {
    textRef.current += newData; // Append new data to the current text
    setText(textRef.current); // Update state to re-render and show the new text
  };

  useEffect(() => {
    if (text !== "" && entryCode) {
      handleUpdate();
    }
  }, [text]);

  useEffect(() => {
    if (isRecording) {
      console.log("Recording started");
      startNewRecorder();
      intervalRef.current = setInterval(startNewRecorder, 5000); // Adjust this interval as needed
    } else {
      console.log("Recording stopped");
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isRecording]);

  useEffect(() => {
    if (socket) {
      socket.on("transcription", (data) => {
        appendText(data); // Call appendText with the new data
      });
    }
  }, [socket]);

  const startRecording = () => {
    if (initial) {
      setInitial(false);
      setText("");
    }
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="entry-container">
      <h1 className="title">{title}</h1>
      <div className="buttonRow">
        <div className={`toggleWrapper ${activeButton === 'Scribe' ? 'scribeActive' : 'aiActive'}`}>
          <button className="scribeButton" onClick={() => setActiveButton('Scribe')}>
            <img src={ScribeIcon} alt="Scribe" className="buttonIcon" />
            <span>Scribe</span>
          </button>
          <button className="aiButton" onClick={() => setActiveButton('AI')}>
            <img src={BrainIcon} alt="AI" className="buttonIcon" />
            <span>AI</span>
          </button>
        </div>
      </div>
      {activeButton === 'Scribe' ? (
        <>
          <textarea
            className="textContent"
            value={text}
            onChange={handleTextChange}
          />
          <div className="recordingSection">
            <button
              className={`recordButton ${isRecording ? "stop" : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <span className="recordText">{isRecording ? "Stop" : "Record"}</span>
              <div className="Space"></div>
              <img
                className="recordIcon"
                src={isRecording ? stopIcon : microphoneIcon}
                alt={isRecording ? "Stop" : "Record"}
              />
            </button>
          </div>
        </>
      ) : (
        <div className="textContent"></div> 
      )}
    </div>
  );  
};

export default Entry;
