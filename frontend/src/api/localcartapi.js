import { getProductById } from "./cartapi";

// Get or create cart from localStorage
export const guestGetCartItems = async () => {
    try {
        let cart = JSON.parse(localStorage.getItem('cart'));

        if (!cart) {
            cart = []; // Create an empty cart if not found
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        return cart;
    } catch (error) {
        console.error("Error fetching the cart:", error);
        return []; // Return empty array on error
    }
};

// Update cart in localStorage
export const guestUpdateCart = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error("Error updating cart:", error);
    }
};

// Add an item to the cart (no need for existing item check if cart is empty)
export const guestAddToCart = async ({ productId, quantity, weight }) => {
    try {
        let cart = await guestGetCartItems(); // Get the current cart

        if (cart.length === 0) {
            // If the cart is empty, add the item directly
            cart.push({
                productId: productId.toString(),
                quantity,
                weight: weight.toString(),
            });
        } else {
            // Check for existing item only if cart has items
            const existingItemIndex = cart.findIndex(
                (item) =>
                    item.productId === productId.toString() &&
                    item.weight === weight.toString()
            );

            if (existingItemIndex > -1) {
                // If the product with the same weight exists, increase the quantity
                cart[existingItemIndex].quantity += quantity;
            } else {
                // Add as a new item if it doesn't exist
                cart.push({
                    productId: productId.toString(),
                    quantity,
                    weight: weight.toString(),
                });
            }
        }

        guestUpdateCart(cart); // Update the cart in localStorage
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};


// Remove an item from the cart
export const guestRemoveFromCart = async ({ productId, weight }) => {
    try {
        const cart = await guestGetCartItems(); // Get current cart

        const updatedCart = cart.filter(
            (item) =>
                item.productId !== productId.toString() ||
                item.weight !== weight.toString()
        );

        guestUpdateCart(updatedCart); // Update cart after removal
    } catch (error) {
        console.error("Error removing from cart:", error);
    }
};

// Get cart and fetch product details for each item
export const guestGetCart = async () => {
    try {
        const localCart = await guestGetCartItems(); // Get cart items
        if (localCart.length === 0) return []; // Return empty if no items

        const items = await Promise.all(
            localCart.map(async (item) => {
                const product = await getProductById(item.productId);
                if (!product || !product.data) throw new Error("Invalid product data");

                return {
                    productId: product.data, // Product details
                    quantity: item.quantity, // Quantity from cart
                    weight: item.weight // Weight from cart
                };
            })
        );

        return items;
    } catch (error) {
        console.error("Error getting cart:", error);
        return []; // Return empty array on error
    }
};

// Update the cart with new items (overwrite existing items)
export const guestUpdateCartItems = async (items) => {
    try {
        if (!Array.isArray(items)) throw new Error("Expecting an array of items.");

        guestUpdateCart(items); // Directly update the cart
    } catch (error) {
        console.error("Error updating cart items:", error);
    }
};

