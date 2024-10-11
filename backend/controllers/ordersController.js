import Order from "../models/order.js";

const createCustomerOrder = async (orderData, packageCategory, courier_id) => {

    const { razorpay_payment_id, shiprocket_order_id, awb, userId } = orderData;
    try {

        if (!razorpay_payment_id && !shiprocket_order_id && !awb && !userId && !packageCategory && !courier_id) {
            return new Error("Order Details not found")
        }

        const newOrder = new Order({
            razorpayPaymentId: razorpay_payment_id,  // Payment ID from Razorpay
            shiprocketOrderId: shiprocket_order_id,  // Shiprocket Order ID
            awb: awb,  // Air Waybill from Shiprocket
            userId: userId,  // User ID (assuming middleware sets t
            packageCategory: packageCategory,
            courierId: courier_id,
        })
        await newOrder.save();

        const orderTrackingLink = `https://shiprocket.co/tracking/${awb}`

        return { success: true, message: "User Order Created Successfully", track_link: orderTrackingLink }
    } catch (error) {
        return error;
    }

}

export { createCustomerOrder }