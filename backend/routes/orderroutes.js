import express from 'express';
import { createMultipleOrders, createOrder, fetchAllOrders, fetchOrderById } from "../controllers/orderController.js"
import { getShippingPrice } from "../controllers/courierController.js";


const orderRouter = express.Router();

// Route to create a new order
orderRouter.post("/create", createOrder);

orderRouter.post("/cartorder", createMultipleOrders);

orderRouter.get("/list", fetchAllOrders);

orderRouter.post("/list", fetchOrderById);

orderRouter.post("/shippingcharges", getShippingPrice)


export default orderRouter;