import express from 'express';
import { createProduct, getAllProducts, getProductById, deleteProduct } from '../controllers/productController.js'; // Adjust the import path as necessary

const productRouter = express.Router();

// Route to create a new product
productRouter.post('/add', createProduct);

// Route to get all products
productRouter.get('/list', getAllProducts);

// Route to get a single product by ID
productRouter.get('/:id', getProductById);

// Route to delete a product by ID
productRouter.delete('/:id', deleteProduct);

export default productRouter;
