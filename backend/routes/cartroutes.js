import express from 'express';
import { addToCart, clearCart, getCart, removeFromCart, updateCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const cartRouter = express.Router();

cartRouter.use(authMiddleware);

// Add or update item in cart
cartRouter.post('/add', addToCart);

// Get user's cart
cartRouter.get('/list', getCart);

cartRouter.put('/update', updateCart)

// Remove item from cart
cartRouter.delete('/remove', removeFromCart);

cartRouter.delete('/clear', clearCart);

export default cartRouter;
