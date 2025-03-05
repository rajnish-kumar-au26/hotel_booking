import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const { user, hotels } = useContext(AuthContext);
  const [filterHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8000/bookings", {
          params: { userId: user.id }, // Pass the logged-in user's ID
        });
        setBookings(response.data.data);
        // Extract unique hotel IDs from bookings
        const hotelIds = [
          ...new Set(response.data.data.map((booking) => booking.hotelId)),
        ];

        // Filter hotels based on the extracted hotel IDs
        const filteredHotelsList = hotels.filter((hotel) =>
          hotelIds.includes(hotel.id)
        );

        setFilteredHotels(filteredHotelsList);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  return (
    <div>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {filterHotels.map((booking) => (
            <li key={booking.id}>
              <p>Booking ID: {booking.id}</p>
              <p>Hotel Name: {booking?.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;
