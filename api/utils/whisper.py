import base64
import sys
import whisper
import tempfile

def transcribe(base64_audio):
    model = whisper.load_model("base")

    # Decode Base64 string to binary data
    audio_data = base64.b64decode(base64_audio.split(',')[1])  # [1] to remove the data URL prefix

    # Write the binary data to a temporary file
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as fp:
        fp.write(audio_data)
        fp.flush()  # Ensure all data is written
        result = model.transcribe(fp.name)
    
    print(result["text"])

if __name__ == "__main__":
    base64_audio = sys.argv[1]
    transcribe(base64_audio)
