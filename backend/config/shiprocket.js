import axios from 'axios';
import { getNextBusinessDay } from '../utils/shiprocketOrderUtils.js';

// Base URL for Shiprocket API
const BASE_URL = process.env.SHIPROCKET_BASE_URL;

// Variable to store the token
let shiprocketToken = "";
const pickupPostCode = process.env.PICKUP_POSTCODE;

const authenticateShiprocket = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    });

    // Log response data for debugging

    // Store the token
    shiprocketToken = response.data.token;
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
const createShipRocketOrder = async (orderData) => {
  try {
    // Ensure that the user is authenticated
    if (!shiprocketToken) {
      await authenticateShiprocket();
    }

    const shiprocketAPI = getShiprocketAPI();
    const response = await shiprocketAPI.post('/orders/create/adhoc', orderData);

    console.log('Order placed successfully:', response.data);

    return response.data;

  } catch (error) {
    console.error('Error placing order:', error.response ? error.response.data : error.message);
  }
};

const generateAWB = async (shippingDetails, retries = 3) => {
  try {
    // Ensure that the user is authenticated
    if (!shiprocketToken) {
      await authenticateShiprocket();
    }

    const shiprocketAPI = getShiprocketAPI();
    const response = await shiprocketAPI.post('/courier/assign/awb', shippingDetails);
    const trackdata = response.data

    console.log('Shipment created successfully:', trackdata);

    return { success: true, data: trackdata.response.data };

  } catch (error) {
    console.error('Error generating AWB:', error.response ? error.response.data : error.message);

    // Handle specific error cases (like invalid shipping details, authentication failure, etc.)
    if (error.response && error.response.status === 401) {
      console.error('Authentication error. Re-authenticating...');
      await authenticateShiprocket();
    }

    // Retry mechanism with limit
    if (retries > 0) {
      console.log(`Retrying AWB generation... Attempts left: ${retries}`);
      return generateAWB(shippingDetails, retries - 1); // Recursive call with reduced retries
    }

    // Return failure response after retries are exhausted
    return { success: false, message: 'Failed to generate AWB after retries', error: error.response ? error.response.data : error.message };
  }
};

const pickupGeneration = async (shippingId) => {
  try {
    // Ensure that the user is authenticated
    if (!shiprocketToken) {
      await authenticateShiprocket();
    }

    const shiprocketAPI = getShiprocketAPI();

    const dateString = getNextBusinessDay();

    const pickupObject = {
      shipment_id: [shippingId],
      pickup_date: [dateString]
    }

    const response = await shiprocketAPI.post('/courier/generate/pickup', pickupObject);
    const pickupResponse = response.data

    console.log('Shipment created successfully:', pickupResponse);

    return { success: true, data: pickupResponse };

  } catch (error) {
    console.error('Error generating AWB:', error.response ? error.response.data : error.message);

    return { success: false, message: 'Failed to generate AWB after retries', error: error };
  }
};



const shippingPrice = async (pincode, weight, price, length, breadth, height) => {
  try {
    // Ensure that the user is authenticated
    if (!shiprocketToken) {
      await authenticateShiprocket();
    }

    const shiprocketAPI = getShiprocketAPI();

    // Prepare query parameters
    const courierParams = {
      pickup_postcode: pickupPostCode,  // Your pickup postcode from .env
      delivery_postcode: pincode,      // Delivery postcode
      cod: 0,                          // Cash on Delivery (0 for no COD)
      weight: weight,
      length,
      breadth,
      height,                          // Weight and dimensions of the package
      declared_value: price            // Declared value of the package
    };

    // Fetch serviceability data
    const response = await shiprocketAPI.get('/courier/serviceability', { params: courierParams });

    // Extract data from the response
    const availableCouriers = response.data.data.available_courier_companies;
    const recommendedCourierId = response.data.data.shiprocket_recommended_courier_id;

    // Variables to store the best options
    let selectedCourier = null;
    let cheapestCourier = null;
    let minCharges = Infinity;

    // Iterate through available couriers once
    for (const courier of availableCouriers) {
      const totalCharges = courier.coverage_charges + courier.freight_charge + courier.other_charges;

      // Check for the cheapest courier
      if (totalCharges < minCharges) {
        minCharges = totalCharges;
        cheapestCourier = courier;
      }

      // Check if it's the recommended courier and satisfies the price condition
      if (
        courier.courier_company_id === recommendedCourierId &&
        totalCharges < price
      ) {
        selectedCourier = courier;
        break; // Stop searching if we find the best option
      }

      // Otherwise, keep track of the first courier that fits the price condition
      if (!selectedCourier && totalCharges < price) {
        selectedCourier = courier;
      }
    }

    // If no courier fits within the product price, use the cheapest option
    if (!selectedCourier) {
      selectedCourier = cheapestCourier;
    }

    // Return the selected courier
    if (selectedCourier) {
      return selectedCourier;
    } else {
      // Handle case where no couriers are available
      throw new Error('No couriers available.');
    }
  } catch (error) {
    console.error('Error Fetching Courier Serviceability:', error.message);
    // Return an appropriate response for errors
    return { success: false, message: "Error Fetching Courier Serviceability" };
  }
};




export { shippingPrice, createShipRocketOrder, generateAWB, pickupGeneration }
