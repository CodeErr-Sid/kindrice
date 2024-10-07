import express from 'express';
import { createMultipleOrders, createOrder, fetchAllOrders, fetchOrderById, fetchPaymentById, normalCheckoutOrder, verifyPayment } from "../controllers/orderController.js"
import { getShippingPrice, getCourierService } from "../controllers/courierController.js";


const orderRouter = express.Router();

// Route to create a new order
orderRouter.post("/create", createOrder);

orderRouter.post("/normal/create", normalCheckoutOrder)

orderRouter.post("/cartorder", createMultipleOrders);

orderRouter.get("/list", fetchAllOrders);

orderRouter.post("/list", fetchOrderById);


orderRouter.post("/shippingcharges", getShippingPrice)

orderRouter.post("/courierservice", getCourierService);


// payment 

orderRouter.post("/payment/verify", verifyPayment);

export default orderRouter;