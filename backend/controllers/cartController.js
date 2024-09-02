import User from "../models/user.js";

// Add or update item in cart
const addToCart = async (req, res) => {
    try {
        const { productId, quantity, weight } = req.body;

        if (!productId || quantity === undefined || weight === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Get the user ID from the middleware
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the product is already in the cart
        const existingItemIndex = user.cart.items.findIndex(item => item.productId.toString() === productId);

        if (existingItemIndex > -1) {
            // Update existing item
            user.cart.items[existingItemIndex].quantity = quantity;
            user.cart.items[existingItemIndex].weight = weight;
        } else {
            // Add new item
            user.cart.items.push({ productId, quantity, weight });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user's cart
const getCart = async (req, res) => {
    try {
        // Get the user ID from the middleware
        const userId = req.userId;

        // Find the user and populate the cart's product details
        const user = await User.findById(userId).populate('cart.items.productId');

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the cart is empty
        if (user.cart.items.length === 0) {
            return res.json({ message: 'Your cart is empty' });
        }

        // Return the cart if it has items
        res.json(user.cart);
    } catch (error) {
        // Handle any errors that occur
        res.status(500).json({ message: error.message });
    }
};


// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Get the user ID from the middleware
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.cart.items = user.cart.items.filter(item => item.productId.toString() !== productId);

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addToCart, removeFromCart, getCart };
