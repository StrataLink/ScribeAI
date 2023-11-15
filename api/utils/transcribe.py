import sys
import whisper
import os

def transcribe(file_path):
    model = whisper.load_model("base")

    # Transcribe the audio file
    result = model.transcribe(file_path,fp16=False)

    print(result["text"])

if __name__ == "__main__":
    file_path = sys.argv[1]
    transcribe(file_path)
