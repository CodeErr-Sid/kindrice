import axios from "axios"
import { toast } from 'react-toastify';


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

export const handler = async (url, response) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

    try {
        // Send the payment details to the backend for verification using axios
        const verificationResponse = await axios.post(url + '/api/orders/payment/verify', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        });

        if (verificationResponse.data.success) {
            toast.success('Payment was successful!');
            // Proceed with further actions like order confirmation
        } else {
            toast.error('Payment verification failed.');
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        toast.error('There was an error during payment verification.');
    }
};






