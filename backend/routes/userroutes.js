import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';

const userRouter = express.Router();


// Add or update item in cart
userRouter.post('/register', registerUser);

// Get user's cart
userRouter.post('/login', loginUser);



export default userRouter;
