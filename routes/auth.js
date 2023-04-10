const express = require("express");
const jsend = require("jsend");
const router = express.Router();
const db = require("../models");
const crypto = require("crypto");
const UserService = require("../services/userService");
const userService = new UserService(db);
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const jwt = require("jsonwebtoken");

router.use(jsend.middleware);

router.post("/signup", async (req, res, next) => {
  const { name, email, password } = req.body;
  if (name == null) {
    return res.jsend.fail({ name: "Name is required!" });
  }
  if (email == null) {
    return res.jsend.fail({ email: "Email is required!" });
  }
  if (password == null) {
    return res.jsend.fail({ password: "Password is required!" });
  }
  const user = await userService.getOne(email);
  if (user != null) {
    return res.jsend.fail({ email: "The provided email is already in use!" });
  }
  const salt = crypto.randomBytes(16);
  crypto.pbkdf2(password, salt, 31000, 32, "sha256", (err, hashedPasword) => {
    if (err) {
      return next(err);
    }
    userService.create(name, email, hashedPasword, salt);
    res.jsend.success({ result: "You created a new user." });
  });
});

module.exports = router;
