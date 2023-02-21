const express = require("express");
const router = express.Router();
const secureController = require("../controllers/secure.controller");

router.get("/profile", secureController.profile);

module.exports = router;
