import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controllers/cartController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';

const cartRouter = express.Router();

cartRouter.use(authMiddleware);

// Add or update item in cart
cartRouter.post('/add', addToCart);

// Get user's cart
cartRouter.get('/list', getCart);

// Remove item from cart
cartRouter.delete('/remove', removeFromCart);

export default cartRouter;
