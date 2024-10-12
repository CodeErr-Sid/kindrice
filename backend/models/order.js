import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    razorpayPaymentId: { type: String, required: true },  // Razorpay payment ID
    shiprocketOrderId: { type: String, required: true },  // Shiprocket order ID
    awb: { type: String, required: true },                // Air Waybill (AWB) number from Shiprocket
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User ID referencing the User model
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
