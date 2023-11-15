import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function AudioRecorder() {
  const [socket, setSocket] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3001");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

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
        console.log(data);
      });
    }
  }, [socket]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return (
    <div>
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>
    </div>
  );
}

export default AudioRecorder;
