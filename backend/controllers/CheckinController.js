const { Checkin, Booking } = require("../config/dbConnect");

const createCheckin = async (req, res) => {
  try {
    const { bookingId, aadhaarNumber, totalPersons } = req.body;

    // Validation: Check if required fields are provided
    if (!bookingId || !aadhaarNumber || !totalPersons) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Validation: Check if bookingId is valid
    const booking = await Booking.findOne({ where: { id: bookingId } });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    // Validation: Check if aadhaarNumber is valid (12 digits)
    const aadhaarRegex = /^\d{12}$/;
    if (!aadhaarRegex.test(aadhaarNumber)) {
      return res
        .status(400)
        .json({ message: "Invalid Aadhaar number. It must be 12 digits." });
    }

    // Validation: Check if totalPersons is a positive number
    if (isNaN(totalPersons) || totalPersons <= 0) {
      return res
        .status(400)
        .json({ message: "Total persons must be a positive number." });
    }

    // Create the check-in record
    const checkins = await Checkin.create({
      bookingId,
      aadhaarNumber,
      totalPersons,
    });

    // Return success response
    res
      .status(201)
      .json({ message: "Hotel Checkin Confirmed", data: checkins });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createCheckin };
