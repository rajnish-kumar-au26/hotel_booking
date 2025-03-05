import axios from "axios";

const API_URL = "http://localhost:8000"; // Update this URL to match your backend server address

// Set up axios to include the JWT token from cookies
axios.defaults.withCredentials = true;

// Fetch all items
export const fetchItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

// Add a new item
export const addItem = async (item) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item);
    return response.data;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
};

// Update an item
export const updateItem = async (item) => {
  try {
    const response = await axios.put(`${API_URL}/items/${item.id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};

// Delete an item
export const deleteItem = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

// Get a single item
export const getItem = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/items/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting item:", error);
    throw error;
  }
};

// Register a new user
export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, user);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Log in a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Log out a user
export const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/logout`);
    return response.data;
  } catch (error) {
    console.error("Error logging out user:", error);
    throw error;
  }
};
