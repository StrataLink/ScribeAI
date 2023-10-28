const express = require("express");
const User = require("../models/User.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Login Endpoint
router.post("/login", async (req, res) => {
  console.log("reached.");
  console.log(User);
  const user = await User.findOne({
    email: req.body.email,
  });

  // const user = await User.find(
  //   (indivUser) => indivUser.email === req.body.email
  // );

  if (!user) {
    return res.status(401).json({ error: "Invalid Email" });
  }

  console.log("found user, other problem");

  const isPasswordValid = await bcryptjs.compare(
    req.body.password,
    user.password
  );

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "someSecretCode666"
    );
    return res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ message: "Login success" });
  } else {
    return res.status(401).json({ error: "Invalid Password" });
  }
});

// Register Endpoint
router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcryptjs.hash(req.body.password, 10);
    console.log(newPassword);
    const check = await User.findOne({
      email: req.body.email,
    });
    console.log("Done", check);
    console.log("here", !!check);
    if (!!check == 0) {
      console.log("badumptssss");
      throw new Error("Email already exists");
    }
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.status(200).json({ message: "Successful registration" });
  } catch (err) {
    console.error();
    res.json({ status: "error", error: "Duplicate email" });
  }
});

// Logout Endpoint
router.get("/logout", async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "logout success" });
});

module.exports = router;
