import mongoose from 'mongoose';

const userDetailsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneno: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
    razorpayPaymentId: { type: String, required: true },  // Razorpay payment ID
    shiprocketOrderId: { type: String, required: true },  // Shiprocket order ID
    awb: { type: String, required: true },                // AWB number from Shiprocket

    // Either userId or userDetails will be present
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: function() { return !this.userDetails; }  // Required if no guest details
    },
    userDetails: { 
        type: userDetailsSchema, 
        required: function() { return !this.userId; }  // Required if no logged-in userId
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
