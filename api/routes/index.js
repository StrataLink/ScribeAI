const express = require("express");
const authRoutes = require("./auth.js");
const userRoutes = require("./user.js");
const entryRoutes = require("./entry.js");
const checkAuth = require("../utils/checkAuth.js")
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/entry', checkAuth, entryRoutes);

module.exports = router;