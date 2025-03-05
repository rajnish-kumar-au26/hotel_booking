const express = require("express");
const router = express.Router();
const { createCheckin } = require("../controllers/CheckinController");

router.post("/", createCheckin);

module.exports = router;
