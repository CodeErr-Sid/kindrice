// axiosInstance.js
import axios from 'axios';

// Create an Axios instance with default configuration

const url = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
    baseURL: url,
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

const updateCart = async (items, token) => {
    setAuthToken(token);
    try {
        const response = await axiosInstance.put('/api/cart/update', {
            items
        });

        return response.success;
    } catch (error) {
        console.error('Error adding to cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
}

// Get user's cart
const getCart = async (token) => {
    setAuthToken(token); // Set the token for the request
    try {
        const response = await axiosInstance.get('/api/cart/list');
        console.log(response.data)
        return response.data; // This will be the cart data
    } catch (error) {
        console.error('Error retrieving cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

// Remove item from cart
const removeFromCart = async (productId, token, weight) => {
    setAuthToken(token); // Set the token for the request
    try {
        const response = await axiosInstance.delete('/api/cart/remove', {
            data: {
                productId: productId,
                weight: weight
            }
        });

        if (response.success) {
            return response;
        }
    } catch (error) {
        console.error('Error removing from cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
};

const clearCart = async (token) => {
    setAuthToken(token);
    try {
        const response = await axiosInstance.delete('/api/cart/clear');

        if (response.success) {
            return response;
        }
    } catch (error) {
        console.error('Error Clearing the cart:', error.response?.data || error.message);
        throw error; // Rethrow or handle the error as needed
    }
}


const getProductById = async (id) => {
    try {
        const response = await axios.get(`${url}/api/product/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export { addToCart, getCart, removeFromCart, getProductById, updateCart, clearCart };



