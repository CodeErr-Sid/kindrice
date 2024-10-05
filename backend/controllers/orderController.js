import Razorpay from 'razorpay';
import Product from '../models/product.js';
import dotenv from 'dotenv';
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils.js';

dotenv.config();

const keyId = process.env.RAZORPAY_KEY_ID
const keySecret = process.env.RAZORPAY_KEY_SECRET

const instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
});

// buy now 
const createOrder = async (req, res) => {
    const { productId, weightCategory, quantity } = req.body;

    try {
        // Find the product by ID
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the weight category
        const weightCategoryDetails = product.weightPrice.find(weight => weight._id.toString() === weightCategory);

        if (!weightCategoryDetails) {
            return res.status(404).json({ message: 'Weight category not found' });
        }

        const totalWeight = weightCategoryDetails.weight.value * quantity;

        // Prepare data for Razorpay
        // Prepare data for Razorpay
        const totalAmount = Math.round(weightCategoryDetails.totalPrice * quantity); // Convert to paise and ensure it's an integer
        var data = {
            "amount": totalAmount * 100, // in paise.
            "currency": "INR",
            "receipt": `reciept${Date.now()}`,
            "notes": { totalWeight: totalWeight, productId: productId, weightCategory: weightCategory, quantity: quantity },
            "line_items_total": totalAmount * 100, // in paise.
            "line_items": [
                {
                    "sku": weightCategoryDetails.sku,
                    "variant_id": weightCategoryDetails._id.toString(), // Weight category ID
                    "price": Math.round(weightCategoryDetails.totalPrice * 100), // Price in paise
                    "offer_price": Math.round(weightCategoryDetails.totalPrice * 100), // Offer price same as product price
                    "tax_amount": 0, // Included in the amount
                    "quantity": quantity, // Quantity from the request
                    "name": product.productName, // Product name
                    "description": product.description, // Product description
                    "weight": weightCategoryDetails.weight.value * 1000, // Convert to grams
                    "dimensions": {
                        "length": Math.round(weightCategoryDetails.dimensions.length),
                        "width": Math.round(weightCategoryDetails.dimensions.breadth),
                        "height": Math.round(weightCategoryDetails.dimensions.height)
                    }, // Use the dimensions from the weight category
                    "image_url": product.images[0], // Use the first image URL
                    "product_url": "https://kindrice.co/shop", // Example product URL
                    "notes": {} // Any additional notes if necessary
                },
            ],
        };

        // Create the order in Razorpay
        const razorpayOrder = await instance.orders.create(data);

        // Return the order details to the client
        res.json({ success: true, message: "order data fetched successfully", data: razorpayOrder });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// cart product
const createMultipleOrders = async (req, res) => {
    const items = req.body.items; // Expecting an array of items [{ productId, we, qu }, { productId, we, qu }]

    try {
        const lineItems = [];
        const cartItems = [];
        let totalAmount = 0;
        let totalWeight = 0; // Variable to accumulate total weight

        // Iterate through each item in the provided array
        for (const item of items) {
            const { productId, weightCategory, quantity } = item;

            cartItems.push(item);

            // Find the product by ID
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: `Product not found for ID: ${productId}` });
            }

            // Find the weight category
            const weightCategoryDetails = product.weightPrice.find(weight => weight._id.toString() === weightCategory);
            if (!weightCategoryDetails) {
                return res.status(404).json({ message: `Weight category not found for weight ID: ${weightCategory}` });
            }

            // Calculate the total amount for this item
            const itemAmount = Math.round(weightCategoryDetails.totalPrice * quantity);
            totalAmount += itemAmount; // Accumulate the total amount

            // Calculate the weight for this item
            const itemWeight = weightCategoryDetails.weight.value * quantity; // Total weight for this item
            totalWeight += itemWeight; // Accumulate total weight in grams

            // Prepare line item data
            lineItems.push({
                sku: weightCategoryDetails.sku,
                variant_id: weightCategoryDetails._id.toString(),
                price: Math.round(weightCategoryDetails.totalPrice * 100), // Price in paise
                offer_price: Math.round(weightCategoryDetails.totalPrice * 100), // Offer price same as product price
                tax_amount: 0, // Included in the amount
                quantity: quantity, // Quantity from the request
                name: product.productName, // Product name
                description: product.description, // Product description
                weight: itemWeight * 1000, // Convert to grams
                dimensions: {
                    length: Math.round(weightCategoryDetails.dimensions.length),
                    width: Math.round(weightCategoryDetails.dimensions.breadth),
                    height: Math.round(weightCategoryDetails.dimensions.height)
                }, // Use the dimensions from the weight category
                image_url: product.images[0], // Use the first image URL
                product_url: "https://kindrice.co/shop", // Example product URL
                notes: {} // Any additional notes if necessary
            });
        }

        // Prepare data for Razorpay
        const data = {
            amount: totalAmount * 100, // Total amount in paise
            currency: "INR",
            receipt: `receipt${Date.now()}`,
            notes: { totalWeight: totalWeight, items: cartItems }, // Include total weight in notes
            line_items_total: totalAmount * 100, // in paise
            line_items: lineItems // The array of line items prepared above
        };

        // Create the order in Razorpay
        const razorpayOrder = await instance.orders.create(data);

        // Return the order details to the client
        res.json({ success: true, message: "Order data fetched successfully", data: razorpayOrder });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};


const fetchOrderById = async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await instance.orders.fetch(orderId);

        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}
const fetchPaymentById = async (req, res) => {
    try {
        const { paymentId } = req.body;

        const response = await instance.payments.fetch(paymentId)

        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

const fetchAllOrders = async (req, res) => {
    try {
        const response = await instance.orders.all({
            "expand[]": "payments"
        })

        res.json(response)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

const fetchOrderId = async (orderId) => {
    try {

        const response = await instance.orders.fetch(orderId);

        return response;
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error })
    }
}

const normalCheckoutOrder = async (req, res) => {

    const { amount, notes } = req.body;

    try {
        const amountInPaise = Math.round(amount * 100)

        var options = {
            amount: amountInPaise,  // amount in the smallest currency unit
            currency: "INR",
            receipt: `reciept${Date.now()}`,
            notes: notes
        };
        const order = await instance.orders.create(options);

        res.json(order);
    } catch (error) {
        res.json(error)
    }
}

const verifyPayment = (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    try {
        // Validate the payment signature
        const isValid = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            keySecret
        );

        if (isValid) {
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            // The payment is invalid
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
}

export { verifyPayment, createOrder, fetchAllOrders, fetchOrderById, createMultipleOrders, fetchOrderId, fetchPaymentById, normalCheckoutOrder }
