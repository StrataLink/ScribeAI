import sys
import whisper

def transcribe(audio):
    model = whisper.load_model("base")
    result = model.transcribe(audio)
    print(result['text'])

if __name__ == "__main__":
    audio_chunk = sys.argv[1]
    transcribe(audio_chunk)