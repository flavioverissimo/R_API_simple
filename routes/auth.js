const express = require("express");
const router = express.Router();
const User = require("../models/user");
const userController = require("../controllers/auth");

const models = {
  User,
};

router.post("/", userController.auth.bind(null, models));

module.exports = router;
