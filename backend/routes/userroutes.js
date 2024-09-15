import express from 'express';
import { registerUser, loginUser, createNewSubscriber } from '../controllers/userController.js';

const userRouter = express.Router();


// Add or update item in cart
userRouter.post('/register', registerUser);

// Get user's cart
userRouter.post('/login', loginUser);

userRouter.post('/subscribe', createNewSubscriber)



export default userRouter;
