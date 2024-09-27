import React, { useContext, useState } from 'react';
import { createOrder } from '../../api/orderapi';
import { AuthContext } from '../../context/AuthContext';


const MagicCheckoutButton = ({ productId, weightCategory, quantity, name, className}) => {

    const { url } = useContext(AuthContext)

    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/magic-checkout.js';
        script.onload = fetchOrderId;  // Fetch order ID once Razorpay script is loaded
        document.body.appendChild(script);
    };

    const fetchOrderId = async () => {
        try {
            setLoading(true);
            const data = await createOrder(url, productId, weightCategory, quantity);
            const orderId = await data.data.id;
            displayRazorpay(orderId);
        } catch (error) {
            console.error('Error fetching order ID:', error);
        } finally {
            setLoading(false);
        }
    };

    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;



    const displayRazorpay = (orderId) => {
        const options = {
            key: razorpayKey,  // Replace with Razorpay Key
            order_id: orderId,   // Order ID from backend
            name: "Kind Rice",
            one_click_checkout: true,
            show_coupons: true,
            handler: function (response) {
                alert(`Payment ID: ${response.razorpay_payment_id}`);
                alert(`Order ID: ${response.razorpay_order_id}`);
                alert(`Signature: ${response.razorpay_signature}`);
            },
            theme: {
                color: '#3399cc',
            },
        };
        console.log(options)

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <button onClick={loadRazorpay} disabled={loading} className={className}>
            {loading ? 'Processing...' : name}
        </button>
    );
};

export default MagicCheckoutButton;
