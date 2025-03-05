const { Booking, Hotel } = require("../config/dbConnect");

// Get details of user's bookings
const getMyBookings = async (req, res) => {
  try {
    const { userId } = req.query; // Retrieve userId from query parameters

    // Fetch bookings with the associated hotel details
    const bookings = await Booking.findAll({
      where: { userId }, // Filter bookings by userId// Order results by booking ID in ascending order
    });

    // Check if no bookings were found
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user." });
    }

    // Respond with the retrieved bookings
    res
      .status(200)
      .json({ message: "Bookings retrieved successfully", data: bookings });
  } catch (error) {
    // Handle errors
    res.status(500).json({ message: error.message });
  }
};
const createBooking = async (req, res) => {
  try {
    const { userId, hotelId } = req.body;
    const booking = await Booking.create({ userId, hotelId });
    res.status(201).json({ message: "Booking Confirmed", data: booking });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createBooking, getMyBookings };
