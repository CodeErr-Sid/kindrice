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
    const [waiting, setWaiting] = useState(false); // State for showing the overlay

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

    const razorpayLiveKey = import.meta.env.VITE_RAZORPAY_LIVE_KEY_ID;

    // test key id
    // const razorpayLiveKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

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
                setWaiting(false); // Hide the overlay after handler executes
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
            // Payment is about to start, show waiting message
            modal: {
                ondismiss: () => {
                    setWaiting(false); // Hide the overlay if user closes Razorpay popup
                }
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', () => {
            setWaiting(false); // Hide overlay if payment fails
            toast.error('Payment failed. Please try again.');
        });

        // Show the waiting overlay once Razorpay opens
        setWaiting(true);

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

            {waiting && (
                <div style={overlayStyle}>
                    <div style={messageBoxStyle}>
                        <p>Please do not close the tab or turn off the internet until the payment is processed.</p>
                    </div>
                </div>
            )}
        </>
    );
};

// Styles for the overlay and message box
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const messageBoxStyle = {
    backgroundColor: '#15803d',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '16px',
    color: '#fff',
};

export default PaymentButton;

