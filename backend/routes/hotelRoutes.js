const express = require("express");
const router = express.Router();
const { getAllHotels, createHotel } = require("../controllers/HotelController");

router.get("/", getAllHotels);
router.post("/", createHotel);

module.exports = router;
