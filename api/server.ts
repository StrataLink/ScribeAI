require("dotenv").config(); // Corrected "dot-env" to "dotenv"

const express = require("express"); // Added import for express
const mongoose = require("mongoose");
const cors = require("cors"); // Added import for cors
const cookieParser = require("cookie-parser"); // Added import for cookie-parser

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successful connection with database"))
  .catch(console.error);

const server = app.listen(3001, () =>
  console.log("Server started on port 3001")
);
