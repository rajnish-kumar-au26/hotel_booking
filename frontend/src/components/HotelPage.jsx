import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import axios from "axios";

const HotelsPage = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState(null);

  const { user, hotels, setHotels } = useContext(AuthContext);

  // Fetch hotels on component mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:8000/hotels"); // Replace with your endpoint
        setHotels(response.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  // Open booking dialog
  const handleBookHotel = (hotel) => {
    setSelectedHotel(hotel);
    setOpenBookingDialog(true);
  };

  // Handle booking submission
  const handleSubmitBooking = async () => {
    try {
      const response = await axios.post("http://localhost:8000/bookings", {
        userId: user.id, // Use the logged-in user's ID
        hotelId: selectedHotel.id,
      });
      setBookingConfirmation(response.data);
      alert("Hotel booked successfully!");
      setOpenBookingDialog(false);
    } catch (error) {
      console.error("Error booking hotel:", error);
      alert("Failed to book hotel.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Hotels
      </Typography>
      <Grid container spacing={3}>
        {hotels.map((hotel) => (
          <Grid item key={hotel.id} xs={12}>
            <Card>
              <Grid container>
                {/* Left Side: Image */}
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      "https://3.imimg.com/data3/JV/KJ/MY-15827078/hotels-booking-1000x1000.jpg"
                    } // Add image property to your hotel data
                    alt={hotel.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Grid>

                {/* Right Side: Details */}
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <CardContent>
                      <Typography variant="h6">{hotel.name}</Typography>
                      <Typography>Location: {hotel.location}</Typography>
                      <Typography>Price: ₹{hotel.price}</Typography>
                      <Typography>
                        Available Rooms: {hotel.availableRooms}
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{ justifyContent: "flex-end", paddingRight: 2 }}
                    >
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleBookHotel(hotel)}
                        sx={{ width: "100%" }} // Set button width to 100%
                      >
                        Book
                      </Button>
                    </CardActions>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Booking Dialog */}
      <Dialog
        open={openBookingDialog}
        onClose={() => setOpenBookingDialog(false)}
      >
        <DialogTitle>Book Hotel</DialogTitle>
        <DialogContent>
          <Typography>
            You are booking: <strong>{selectedHotel?.name}</strong>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBookingDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmitBooking} color="primary">
            Confirm Booking
          </Button>
        </DialogActions>
      </Dialog>

      {/* Booking Confirmation */}
      {bookingConfirmation && (
        <Typography variant="h6" color="primary" gutterBottom>
          Booking Confirmed! Booking ID: {bookingConfirmation.data.id}
        </Typography>
      )}
    </Container>
  );
};

export default HotelsPage;
