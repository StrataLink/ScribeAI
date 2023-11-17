const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require("./routes/index.js");
const cookieParser = require("cookie-parser");
const { PythonShell } = require('python-shell');

require("dotenv").config();
/*
  use the same app object from express to handle both regular HTTP requests 
  and WebSocket connections by integrating socket.io directly with the app object.
  By doing this, we are using the same app object to handle both regular 
  HTTP requests and WebSocket connections via socket.io, 
  making our code more concise and efficient. 
*/

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api", allRoutes);
app.post('/api/summarize/summarize', (req, res) => {
  // Extract the text to be summarized from the request body
  const { text } = req.body;
  
  // Spawn the Python process
  const pythonProcess = spawn('python', ['./utils/summarize.py', text]);

  // Collect data from script
  let scriptOutput = '';
  pythonProcess.stdout.on('data', (data) => {
    scriptOutput += data.toString();
  });

  // Collect error from script if any
  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
  });

  // Handle script completion
  pythonProcess.on('close', (code) => {
    if (code !== 0) {
      return res.status(500).json({ message: 'Summarization failed' });
    }
    res.json({ summarizedText: scriptOutput });
  });
});
/* Whenever we want to access the backend through
   the frontend use this endpoint format: 
   "/api/<model>/<typeofReuqest, ex: getallTasks>"
*/

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

const server = app.listen(3001, () =>
  console.log("Server started on port 3001")
);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const fs = require("fs");
const fsPromises = require("fs").promises; // For promise-based operations
const { spawn } = require("child_process");
const { v4: uuidv4 } = require("uuid");

io.on("connection", (socket) => {
  socket.on("transcribeAudio", async (audioChunk) => {
    const tempDir = "./temp";
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const tempFilePath = `./temp/${uuidv4()}.wav`;

    try {
      await fsPromises.writeFile(tempFilePath, audioChunk, {
        encoding: "binary",
      }); // Use await to ensure completion
      console.log("File written successfully");
      // Spawn the Python process here, after file has been written
      const pythonProcess = spawn("python3", [
        "./utils/transcribe.py",
        tempFilePath,
      ]);

      pythonProcess.stdout.on("data", (data) => {
        socket.emit("transcription", data.toString());
      });

      pythonProcess.stderr.on("data", (data) => {
        console.error(`stderr: ${data}`);
      });
      pythonProcess.on("close", (code) => {
        console.log(`child process exited with code ${code}`);

        // Perform file deletion here
        try {
          if (fs.existsSync(tempFilePath)) {
            fs.unlinkSync(tempFilePath);
            console.log("Temporary file deleted successfully.");
          }
        } catch (unlinkErr) {
          console.error("Error deleting temporary file:", unlinkErr);
        }
      });
    } catch (err) {
      console.error("Error writing audio to file:", err);
      // Handle error appropriately
    }
  });
});
