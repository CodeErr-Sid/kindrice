import Razorpay from 'razorpay';
import Product from '../models/product.js';


const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

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

        // Prepare data for Razorpay
        // Prepare data for Razorpay
        const totalAmount = Math.round(weightCategoryDetails.totalPrice * quantity); // Convert to paise and ensure it's an integer
        var data = {
            "amount": totalAmount * 100, // in paise.
            "currency": "INR",
            "receipt": `reciept${Date.now()}`,
            "notes": {},
            "line_items_total": totalAmount * 100, // in paise.
            "line_items": [
                {
                    "sku": product.sku,
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
                }
            ]
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

const fetchOrderById = async (req, res) => {
    try {
        const { orderId } = req.body;

        const response = await instance.orders.fetch(orderId);

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

export { createOrder, fetchAllOrders, fetchOrderById }
