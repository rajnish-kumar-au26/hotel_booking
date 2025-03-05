import React, { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState({
    name: "",
    location: "",
    price: "",
    availableRooms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/hotels",
        hotelData
      );
      console.log("Hotel added successfully:", response.data);
      navigate("/hotels");
      // You can add a toast notification or a success message here
    } catch (error) {
      console.error("Error adding hotel:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Add New Hotel
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Hotel Name"
          name="name"
          value={hotelData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Location"
          name="location"
          value={hotelData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          value={hotelData.price}
          onChange={handleChange}
          fullWidth
          type="number"
          margin="normal"
        />
        <TextField
          label="Available Rooms"
          name="availableRooms"
          value={hotelData.availableRooms}
          onChange={handleChange}
          fullWidth
          type="number"
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Add Hotel
        </Button>
      </Box>
    </Container>
  );
};

export default AddHotel;
