import React, { useEffect, useState, useRef } from "react";

function AudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [chunks, setChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const chunksRef = useRef<Blob[]>([]);

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
    console.log("called");
    if (mediaRecorder) {
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const newChunk = event.data;
          chunksRef.current.push(newChunk);

          if (!isRecording && chunksRef.current.length > 0) {
            mediaRecorder.onstop = (event) => {
              const timestamp = new Date().toISOString();
              const filename = `audio_${timestamp}.mp3`;
              const blob = new Blob(chunksRef.current, { type: "audio/mp3" });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = filename;

              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
              chunksRef.current = [];
              console.log("Recording stopped");
            };
          }
        }
      };
    }
  }, [mediaRecorder, isRecording]);

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
