import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { Container, Typography } from "@mui/material";
import HotelsPage from "./components/HotelPage";
import MyBookingsPage from "./components/MyBookingsPage"; // Import MyBookingsPage
import CheckinPage from "./components/CheckinPage"; // Import CheckinPage
import AddHotel from "./components/AddHotel";

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          {/* Public Routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/hotels"
            element={
              isAuthenticated ? (
                <HotelsPage />
              ) : (
                <Typography>Please log in to view hotels.</Typography>
              )
            }
          />
          <Route
            path="/my-bookings"
            element={
              isAuthenticated ? (
                <MyBookingsPage />
              ) : (
                <Typography>Please log in to view your bookings.</Typography>
              )
            }
          />
          <Route
            path="/checkin"
            element={
              isAuthenticated ? (
                <CheckinPage />
              ) : (
                <Typography>Please log in to check in.</Typography>
              )
            }
          />
          <Route
            path="/add-hotel"
            element={
              isAuthenticated ? (
                <AddHotel />
              ) : (
                <Typography>Please log in to check in.</Typography>
              )
            }
          />

          {/* Default Route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HotelsPage />
              ) : (
                <Typography>Welcome! Please log in or register.</Typography>
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
