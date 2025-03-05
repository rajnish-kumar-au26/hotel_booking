import React, { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser, logoutUser } from "../api";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [hotels, setHotels] = useState([]);

  const handleRegisterUser = async (userData) => {
    setErrorMessage(null);
    try {
      await registerUser(userData);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error registering user"
      );
      throw error;
    }
  };

  const handleLoginUser = async (credentials) => {
    setErrorMessage(null);
    try {
      const response = await loginUser(credentials);
      setIsAuthenticated(true);
      console.log("response.data.data", response.data);
      setUser(response.data); // Set user details after login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error logging in user");
      throw error;
    }
  };

  const handleLogoutUser = async () => {
    setErrorMessage(null);
    try {
      await logoutUser();
      setIsAuthenticated(false);
      setUser(null); // Clear user details after logout
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error logging out user"
      );
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        loading,
        errorMessage,
        user,
        hotels,
        setHotels,
        setErrorMessage,
        handleRegisterUser,
        handleLoginUser,
        handleLogoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
