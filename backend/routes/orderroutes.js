import express from 'express';
import { createOrder, fetchAllOrders, fetchOrderById } from "../controllers/orderController.js"

const orderRouter = express.Router();

// Route to create a new order
orderRouter.post("/create", createOrder);

orderRouter.get("/list", fetchAllOrders);

orderRouter.post("/list", fetchOrderById);


export default orderRouter;