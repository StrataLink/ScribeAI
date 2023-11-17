const express = require("express");
const User = require("../models/User.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Login Endpoint
router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid Email." });
  }

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
    return res.status(401).json({ error: "Invalid Password." });
  }
});

// Register Endpoint
router.post("/register", async (req, res) => {
  try {
    const newPassword = await bcryptjs.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    res.status(200).json({ message: "Successful registration." });
  } catch (e) {
    console.error(e);
    res.status(401).json({ error: "Failed registration." });
  }
});

router.get("/profile", async(req, res) => {
  if (!req.user) {
    return res.status(500).json({ error: "Cannot find a user." });
  }
  try{ 
    const user = await User.findOne({
    email: req.user.email,
    })
    res.status(200).json({message: "Found user.", user: user})
  }
  catch (e) {
    res.status(404).json({error: "Cannot find a user associated with this email."});
  }
})

// Logout Endpoint
router.get("/logout", async (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "logout success" });
});

module.exports = router;
