const express = require("express");
const router = express.Router();
const {
  createBooking,
  getMyBookings,
} = require("../controllers/BookingController");

router.get("/", getMyBookings);
router.post("/", createBooking);

module.exports = router;
