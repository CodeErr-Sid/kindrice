import React, { useContext, useState } from 'react';
import { normaCheckoutOrder, paymentHandler, guestPaymentHandler } from '../../api/orderapi'; 
import { AuthContext } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const PaymentButton = ({ 
    name, 
    className, 
    amount, 
    singleProduct, 
    notes, 
    disabled, 
    address, 
    pathway 
}) => {
    const { 
        url, 
        idToken, 
        getCart, 
        isLoggedIn, 
        user, 
        refreshToken 
    } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        if (disabled) {
            toast.error('Please fill the form before proceeding!');
            return;
        }

        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = fetchOrderId;
        document.body.appendChild(script);
    };

    const fetchOrderId = async () => {
        try {
            setLoading(true);

            const data = await normaCheckoutOrder(url, amount, notes);
            const orderId = data.id;

            if (isLoggedIn) {
                await refreshToken(user); // Refresh token for logged-in users
            }

            displayRazorpay(orderId);
        } catch (error) {
            console.error('Error fetching order ID:', error);
        } finally {
            setLoading(false);
        }
    };

    // const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    const razorpayLiveKey = import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID;

    const fullname = address.firstname + " " + (address.lastname || "");
    const email = address.email;
    const contact = address.phoneno;

    const displayRazorpay = (orderId) => {
        const options = {
            key: razorpayLiveKey, 
            order_id: orderId,   
            name: "Kind Rice",
            show_coupons: false,
            image: assets.rpkindlogo,
            handler: (response) => {
                // Determine which payment handler to use based on login status
                if (isLoggedIn) {
                    paymentHandler(url, response, idToken, getCart, singleProduct);
                } else {
                    guestPaymentHandler(url, response, singleProduct); // Use guest handler for guest users
                }
            },
            prefill: {
                name: fullname,
                email: email,
                contact: contact
            },
            theme: {
                color: '#15803d',
            },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <>
            <button 
                onClick={loadRazorpay} 
                className={className}
            >
                {loading ? 'Processing...' : name}
            </button>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
};

export default PaymentButton;
