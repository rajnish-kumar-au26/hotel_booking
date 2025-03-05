import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, handleLogoutUser, errorMessage, setErrorMessage } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (
      !isAuthenticated &&
      !["/login", "/register"].includes(window.location.pathname)
    ) {
      navigate("/hotels");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    }
  }, [errorMessage, setErrorMessage]);

  const handleLogout = async () => {
    try {
      await handleLogoutUser();
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Hotel Bookings
      </Typography>
      <List>
        {!isAuthenticated ? (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/hotels">
              <ListItemText primary="Hotels" />
            </ListItem>
            <ListItem button component={Link} to="/my-bookings">
              <ListItemText primary="My Bookings" />
            </ListItem>
            <ListItem button component={Link} to="/checkin">
              <ListItemText primary="Check-in" />
            </ListItem>
            <ListItem button component={Link} to="/add-hotel">
              <ListItemText primary="Add Hotel" />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Hotel Bookings
            </Typography>
            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {!isAuthenticated ? (
                <>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                    Register
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={Link} to="/hotels">
                    Hotels
                  </Button>
                  <Button color="inherit" component={Link} to="/my-bookings">
                    My Bookings
                  </Button>
                  <Button color="inherit" component={Link} to="/checkin">
                    Check-in
                  </Button>
                  <Button color="inherit" component={Link} to="/add-hotel">
                    Add Hotel
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { sm: "none" } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
