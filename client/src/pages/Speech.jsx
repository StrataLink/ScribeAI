import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function AudioRecorder() {
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [chunks, setChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const chunksRef = useRef([]);

  useEffect(() => {
    const initializeSocket = () => {
      const newSocket = io("http://localhost:3001");
      setSocket(newSocket);
    };

    initializeSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      console.log("worked");
      socket.emit("joined", isRecording);
    }
  }, [socket]);

  useEffect(() => {
    let recorder = null;

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });

    return () => {
      if (recorder) {
        recorder.onstop = null;
        recorder.ondataavailable = null;
        recorder.stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && mediaRecorder) {
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const reader = new FileReader();
          reader.readAsDataURL(event.data); // Convert Blob to Base64
          reader.onloadend = function () {
            const base64data = reader.result;
            if (socket) {
              socket.emit("transcribeAudio", base64data); // Send the Base64 string
            }
          };
          // Clear the reference array after sending
          chunksRef.current = [];
        }
      };
      return () => {
        mediaRecorder.ondataavailable = null; // Reset the event handler
      };
    }
  }, [isRecording, mediaRecorder, socket]);

  const startRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      console.log("recording");
      mediaRecorder.start(2000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      setIsRecording(false);
      console.log("stopped recording");
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
}

export default AudioRecorder;
