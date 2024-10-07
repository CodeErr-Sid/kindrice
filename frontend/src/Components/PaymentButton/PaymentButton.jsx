import React, { useContext, useState } from 'react';
import { normaCheckoutOrder, handler } from '../../api/orderapi';
import { AuthContext } from '../../context/AuthContext';
import { assets } from '../../assets/assets';
import { clearCart } from '../../../../backend/controllers/cartController';
import { useNavigate } from 'react-router-dom';


const PaymentButton = ({ name, className, amount, notes, disabled, address }) => {

    const { url, idToken, getCart, isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = fetchOrderId;  // Fetch order ID once Razorpay script is loaded
        document.body.appendChild(script);
    };

    console.log(notes);

    const fetchOrderId = async () => {
        if (isLoggedIn) {
            try {
                setLoading(true);

                const data = await normaCheckoutOrder(url, amount, notes);
                const orderId = await data.id;
                displayRazorpay(orderId);
            } catch (error) {
                console.error('Error fetching order ID:', error);
            } finally {
                setLoading(false);
            }
        } else {
            navigate('/login')
        }
    };

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

    const fullname = address.firstname + " " + address.lastname ? address.lastname : "";
    const email = address.email;
    const contact = address.phoneno;

    const displayRazorpay = (orderId) => {
        const options = {
            key: razorpayKey,  // Replace with Razorpay Key
            order_id: orderId,   // Order ID from backend
            name: "Kind Rice",
            show_coupons: false,
            image: assets.rpkindlogo,
            handler: (response) => {
                handler(url, response, idToken, getCart);
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
        <button onClick={loadRazorpay} disabled={disabled ? disabled : loading} className={className}>
            {loading ? 'Processing...' : name}
        </button>
    );
};

export default PaymentButton;
