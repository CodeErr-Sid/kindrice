import express from 'express';
import { registerUser, loginUser, createNewSubscriber, getUserBillingInformation } from '../controllers/userController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
const userRouter = express.Router();

 

// Add or update item in cart
userRouter.post('/register', registerUser);

// Get user's cart
userRouter.post('/login', loginUser);

userRouter.post('/addresses', authMiddleware, getUserBillingInformation);

userRouter.post('/subscribe', createNewSubscriber)



export default userRouter;
