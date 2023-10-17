const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const allRoutes = require("./routes/index.js");
const cookieParser = require("cookie-parser");

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

app.listen(3001, () =>
  console.log("Server started on port 3001")
);

// Not needed
// const io = require("socket.io")(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("joined room", (roomCode) => {
//     socket.join(roomCode);
//     console.log("User Joined Room: " + roomCode);
//   });
//   socket.on("new message", (newMessageRecieved) => {
//     socket
//       .to(newMessageRecieved.room._id)
//       .emit("message received", newMessageRecieved);
//   });
// });
