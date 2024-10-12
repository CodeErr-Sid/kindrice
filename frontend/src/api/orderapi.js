import axios from "axios"
import { toast } from 'react-toastify';
import { clearCart, getCart } from "../api/cartapi"

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


export const createOrder = async (url, productId, weightCategory, quantity) => {
    try {
        const response = await axios.post(url + "/api/orders/create", {
            productId,
            weightCategory,
            quantity
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

export const normaCheckoutOrder = async (url, amount, notes) => {
    try {
        const response = await axios.post(url + "/api/orders/normal/create", {
            amount,
            notes,
        });

        return response.data;
    } catch (error) {
        return error;
    }
}

// payment verfication

export const paymentHandler = async (url, response, idToken, singleProduct) => {
    setAuthToken(idToken);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

    try {
        // Send the payment details to the backend for verification using axios
        const verificationResponse = await axiosInstance.post(url + '/api/orders/payment/verify', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        });




        if (verificationResponse.data.success) {
            toast.success(verificationResponse.data.message || "Order Created Successfully");
            const orderTracking = await verificationResponse.data.data;

            if (!orderTracking) {
                toast.error("There is no OrderLink")
            }

            if (!singleProduct) {
                await clearCart(idToken);
                await getCart(idToken);
            }

            window.location.href = orderTracking;


        } else {
            toast.error('Payment verification failed.');
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        toast.error('There was an error during payment verification.');
    }
};






