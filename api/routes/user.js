const express = require("express");
const User = require("../models/User");
// const path = require("path");

const router = express.Router();

router.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.status(500).json({ error: "Cannot find a user." });
  }
  try {
    const user = await User.findOne({
      email: req.user.email,
    });
    res.status(200).json({ message: "Found user.", user: user });
  } catch (e) {
    res
      .status(404)
      .json({ error: "Cannot find a user associated with this email." });
  }
});

module.exports = router;
