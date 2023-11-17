const express = require("express");
const authRoutes = require("./auth.js");
const userRoutes = require("./user.js");
const entryRoutes = require("./entry.js");
const summarizeRoutes = require("./summarize.js");
const checkAuth = require("../utils/checkAuth.js")
const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', checkAuth, userRoutes);
router.use('/entry', checkAuth, entryRoutes);
router.use('/entry', checkAuth, summarizeRoutes);

module.exports = router;