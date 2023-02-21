const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const healthController = require("../controllers/health.controller");

const router = express.Router();

router.get("/ping", healthController.ping);

router.post("/signup", passport.authenticate("signup", { session: false }), authController.signUp);

router.post("/login", authController.login);

module.exports = router;
