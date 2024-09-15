import axios from "axios"
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();


// Base URL for Shiprocket API
const BASE_URL = process.env.SHIPROCKET_BASE_URL;

// Variable to store the token
let shiprocketToken = null;

/**
 * Login to Shiprocket to get the authentication token.
 * The token is valid for 10 days.
 */
const authenticateShiprocket = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    });

    // Store the token
    shiprocketToken = response.data.token;
    console.log('Authentication successful, token retrieved:', shiprocketToken);
  } catch (error) {
    console.error('Error during authentication:', error.response ? error.response.data : error.message);
  }
};

/**
 * Create an Axios instance pre-configured with the Bearer token.
 */
const getShiprocketAPI = () => {
  if (!shiprocketToken) {
    throw new Error('Token not available. Please authenticate first.');
  }

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${shiprocketToken}`
    }
  });
};

/**
 * Example function to create an order with Shiprocket.
 */
const createOrder = async (orderData) => {
  try {
    // Ensure that the user is authenticated
    if (!shiprocketToken) {
      await authenticateShiprocket();
    }

    const shiprocketAPI = getShiprocketAPI();
    const response = await shiprocketAPI.post('/orders/create/adhoc', orderData);

    console.log('Order placed successfully:', response.data);
  } catch (error) {
    console.error('Error placing order:', error.response ? error.response.data : error.message);
  }
};

var orderData = JSON.stringify({
  "order_id": "224-4779",                    // Your own generated Order ID
  "order_date": "2024-09-01 12:00",          // Order date and time
  "pickup_location": "primary",                // Pickup location for the order
  "channel_id": "5465902",                  // Channel ID (from your Shiprocket account)
  "comment": "Reseller: M/s Goku",           // Optional comment
  "billing_customer_name": "Naruto",         // Billing customer name
  "billing_last_name": "Uzumaki",            // Billing last name
  "billing_address": "House 221B, Leaf Village", 
  "billing_city": "New Delhi",               // Billing city
  "billing_pincode": "110002",               // Billing postal code
  "billing_state": "Delhi",                  // Billing state
  "billing_country": "India",                // Billing country
  "billing_email": "naruto@uzumaki.com",     // Billing email
  "billing_phone": "9876543210",             // Billing phone
  "shipping_is_billing": true,               // Shipping same as billing address
  "order_items": [                           // Ordered items
    {
      "name": "Kunai",
      "sku": "chakra123",                    // SKU for manual orders (optional)
      "units": 10,                           // Number of units
      "selling_price": "900",                // Price per unit
      "hsn": 441122                          // HSN code for tax purposes
    }
  ],
  "payment_method": "Prepaid",               // Prepaid or COD
  "shipping_charges": 0,                     // Shipping charges
  "sub_total": 9000,                         // Subtotal
  "length": 10,                              // Package length
  "breadth": 15,                             // Package breadth
  "height": 20,                              // Package height
  "weight": 2.5                              // Package weight
});

createOrder(orderData);
