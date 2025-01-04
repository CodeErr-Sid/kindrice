import express from 'express';
import { registerUser, loginUser, createNewSubscriber, getUserBillingInformation, saveContactDetails, getSubscribersAsExcel } from '../controllers/userController.js';
import authMiddleware from '../middleware/AuthMiddleware.js';
const userRouter = express.Router();



// Add or update item in cart
userRouter.post('/register', registerUser);

// Get user's cart
userRouter.post('/login', loginUser);

userRouter.post('/addresses', authMiddleware, getUserBillingInformation);

userRouter.post('/subscribe', createNewSubscriber)

userRouter.get('/subscribersexcel', getSubscribersAsExcel)

userRouter.post('/contactdetails', saveContactDetails)



export default userRouter;
