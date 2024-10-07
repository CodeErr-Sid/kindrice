import axios from 'axios';

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



    res.json({ data: response.data })

    console.log('Order placed successfully:', response.data);
  } catch (error) {
    console.error('Error placing order:', error.response ? error.response.data : error.message);
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
      delivery_postcode: pincode,                    // Delivery postcode
      cod: 0,                      // Cash on Delivery (0 for no COD)
      weight: weight,
      length,
      breadth,
      height,                          // Weight of the package
      declared_value: price                          // Declared value of the package
    };

    // Use axios.get() with query parameters
    const response = await shiprocketAPI.get('/courier/serviceability', { params: courierParams });

    // Log the response for debugging

    // Find the recommended courier
    const recommendedCourierId = response.data.data.shiprocket_recommended_courier_id;
    const recommendedCourier = response.data.data.available_courier_companies.filter(courier => courier.courier_company_id === recommendedCourierId);

    return recommendedCourier;
  } catch (error) {
    // Catch and display any errors that occur during the request
    res.status(500).json({ success: false, message: "Error Fetching Courier Servicablity" });
  }
};


export { shippingPrice, createShipRocketOrder }
