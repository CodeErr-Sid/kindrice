import Order from '../models/order.js'; // Import the Order model

// Function for Logged-in Users
const createCustomerOrder = async (orderData, packageCategory, courier_id) => { 
    const { razorpay_payment_id, shiprocket_order_id, awb, userId } = orderData;

    try {
        if (!razorpay_payment_id || !shiprocket_order_id || !awb || !userId || !packageCategory || !courier_id) {
            throw new Error("Order Details not found");
        }

        const newOrder = new Order({
            razorpayPaymentId: razorpay_payment_id,
            shiprocketOrderId: shiprocket_order_id,
            awb: awb,
            userId: userId,
            packageCategory: packageCategory,
            courierId: courier_id,
        });

        await newOrder.save();
        const link = `https://shiprocket.co/tracking/${awb}`;
        return { success: true, message: "User Order Created Successfully", data: link };

    } catch (error) {
        return { success: false, message: error.message };
    }
};

// Function for Guest Users
const createGuestOrder = async (guestData, orderData, packageCategory, courier_id) => {
    const { name, email, phoneno } = guestData;
    const { razorpay_payment_id, shiprocket_order_id, awb } = orderData;

    try {
        if (!name || !email || !phoneno || !razorpay_payment_id || !shiprocket_order_id || !awb || !packageCategory || !courier_id) {
            throw new Error("Order Details not found");
        }

        const newOrder = new Order({
            razorpayPaymentId: razorpay_payment_id,
            shiprocketOrderId: shiprocket_order_id,
            awb: awb,
            userDetails: { name, email, phoneno },  // Store guest user details
            packageCategory: packageCategory,
            courierId: courier_id,
        });

        await newOrder.save();
        const link = `https://shiprocket.co/tracking/${awb}`;
        return { success: true, message: "Guest Order Created Successfully", data: link };

    } catch (error) {
        return { success: false, message: error.message };
    }
};

export { createCustomerOrder, createGuestOrder };
