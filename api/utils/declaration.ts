/* eslint-disable @typescript-eslint/no-unused-vars */
// This file holds all import declarations in API

// models/User.ts
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("../models/User.js");

// routes files, auth and user
const express = require('express');
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// routes/index.ts
const userRoutes = require('user');
const authRoutes = require('auth');
const checkAuth_ = require('../utils/checkAuth') // changed name with _ to prevent redeclaration.

// server.ts
const cors = require("cors");
const allRoutes = require('./routes/index.js');
const cookieParser = require('cookie-parser');