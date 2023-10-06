import React, { useEffect, useState } from "react";

declare var MediaRecorder: any;
declare global {
  interface MediaRecorderDataAvailableEvent extends Event {
    data: Blob;
  }
}

const AudioRecorder: React.FC = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [chunks, setChunks] = useState<MediaRecorderDataAvailableEvent[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    let recorder: MediaRecorder | null = null;
    const handleDataAvailable = (event: MediaRecorderDataAvailableEvent) => {
      if (event.data.size > 0) {
        setChunks((prevChunks) => [...prevChunks, event]);
      }
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        recorder = new MediaRecorder(stream);
        if (recorder) recorder.ondataavailable = handleDataAvailable;
        setMediaRecorder(recorder);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });

    return () => {
      if (recorder) {
        recorder.ondataavailable = null; // Remove event listener to prevent memory leaks
        recorder = null;
      }
    };
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      setIsRecording(true);
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      setIsRecording(false);
      mediaRecorder.stop();
    }
  };

  return (
    <div>
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <div>
        {chunks.map((chunk) => (
          <div className="user">{chunk.timeStamp}</div>
        ))}
      </div>
    </div>
  );
};

export default AudioRecorder;
