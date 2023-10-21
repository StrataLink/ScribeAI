import React, { useEffect, useState } from "react";

function AudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let recorder: MediaRecorder | null = null;

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
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setChunks((prevChunks) => [...prevChunks, event.data]);
          console.log(chunks);
        }
      };
      if (!isRecording) {
        mediaRecorder.onstop = (event) => {
          if (chunks.length > 0) {
            const timestamp = new Date().toISOString(); // Use a timestamp for a unique filename
            const filename = `audio_${timestamp}.mp3`;
            const blob = new Blob(chunks, { type: "audio/mp3" });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;

            // Add the anchor element to the DOM
            document.body.appendChild(a);

            // Programmatically click the link to initiate the download
            a.click();

            // Remove the anchor element from the DOM
            document.body.removeChild(a);

            window.URL.revokeObjectURL(url);
            setChunks([]); // Clear the chunks
          }
          console.log("Recording stopped");
        };
      }
    }
  }, [mediaRecorder, chunks, isRecording]);

  const startRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      console.log("recording");
      mediaRecorder.start();
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
