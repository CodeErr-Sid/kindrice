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

        // Ensure productId is treated as a string for comparison
        const stringProductId = productId.toString();
        const stringWeight = weight.toString();

        // Check if the product with the same productId and weight is already in the cart
        const existingItemIndex = user.cart.items.findIndex(item =>
            item.productId.toString() === stringProductId && item.weight.toString() === stringWeight
        );

        if (existingItemIndex > -1) {
            // If the product with the same weight is found, increase the quantity
            user.cart.items[existingItemIndex].quantity += quantity;
        } else {
            // Add new item if it doesn't exist
            user.cart.items.push({
                productId: stringProductId,
                quantity,
                weight: stringWeight
            });
        }

        await user.save();
        res.json(user.cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const { items } = req.body; // Expecting an array of items with { productId, quantity, weight }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'Invalid input. Expecting an array of items.' });
        }

        // Get the user ID from the middleware
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update cart items based on the provided array
        items.forEach(({ productId, quantity, weight }) => {
            if (!productId || quantity === undefined || weight === undefined) {
                return res.status(400).json({ message: 'Missing required fields in item.' });
            }

            // Ensure productId and weight are treated as strings for comparison
            const stringProductId = productId.toString();
            const stringWeight = weight.toString();

            // Check if the product with the same productId and weight is already in the cart
            const existingItemIndex = user.cart.items.findIndex(item =>
                item.productId.toString() === stringProductId && item.weight.toString() === stringWeight
            );

            if (existingItemIndex > -1) {
                // If the product with the same weight is found, update the quantity
                user.cart.items[existingItemIndex].quantity = quantity; // Update quantity directly
            } else {
                // Add new item if it doesn't exist
                user.cart.items.push({
                    productId: stringProductId,
                    quantity,
                    weight: stringWeight
                });
            }
        });

        await user.save();
        res.json({ success: true, message: "Cart Updated Successfully" });
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
        const { productId, weight } = req.body;

        if (!productId || !weight) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Get the user ID from the middleware
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.cart.items = user.cart.items.filter(item => item.productId.toString() !== productId || item.weight !== weight);

        await user.save();
        res.json({ success: true, message: "Successfully Removed from cart", data: user.cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { addToCart, removeFromCart, getCart, updateCart };
