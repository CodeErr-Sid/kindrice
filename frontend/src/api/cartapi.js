// axiosInstance.js
import axios from 'axios';

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to set the authorization token in the headers
const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers['Authorization'];
    }
};

// api/cart.js

// Add or update item in cart
const addToCart = async (productId, quantity, weight, token) => {
    setAuthToken(token); // Set the token for the request
    try {
        const response = await axiosInstance.post('/api/cart/add', {
            productId,
            quantity,
            weight
        });
        return response.data; // This will be the updated cart
    } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

// Get user's cart
const getCart = async (token) => {
    setAuthToken(token); // Set the token for the request
    try {
        const response = await axiosInstance.get('/api/cart/list');
        return response.data; // This will be the cart data
    } catch (error) {
        console.error('Error retrieving cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

// Remove item from cart
const removeFromCart = async (productId, token) => {
    setAuthToken(token); // Set the token for the request
    try {
        const response = await axiosInstance.delete('/api/cart/remove', {
            productId
        });
        return response.data; // This will be the updated cart
    } catch (error) {
        console.error('Error removing from cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

export { addToCart, getCart, removeFromCart };



