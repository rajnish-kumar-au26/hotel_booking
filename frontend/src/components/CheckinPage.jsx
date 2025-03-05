import React, { useState, useContext } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const CheckinPage = () => {
  const [bookingId, setBookingId] = useState("");
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [totalPersons, setTotalPersons] = useState(0);
  const [checkinConfirmation, setCheckinConfirmation] = useState(null);

  const { user } = useContext(AuthContext);

  // Handle check-in submission
  const handleSubmitCheckin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/checkins", {
        bookingId: bookingId,
        aadhaarNumber: aadhaarNumber,
        totalPersons: totalPersons, // Include the user ID for verification
      });
      setCheckinConfirmation(response.data);
      alert("Check-in successful!");
    } catch (error) {
      console.error("Error during check-in:", error);
      alert("Failed to check in.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Check-in
      </Typography>
      <TextField
        label="Booking ID"
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Total Persons"
        value={totalPersons}
        onChange={(e) => setTotalPersons(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Aadhaar Number"
        value={aadhaarNumber}
        onChange={(e) => setAadhaarNumber(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmitCheckin}>
        Submit Check-in
      </Button>

      {/* Check-in Confirmation */}
      {checkinConfirmation && (
        <Typography variant="h6" color="secondary" gutterBottom>
          Check-in Confirmed! Aadhaar: {checkinConfirmation.data.aadhaarNumber}
        </Typography>
      )}
    </Container>
  );
};

export default CheckinPage;
