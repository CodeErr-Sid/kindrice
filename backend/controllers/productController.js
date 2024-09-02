import Product from "../models/product.js"; // Adjust the import path as necessary

// Create a new product
const createProduct = async (req, res) => {
    try {
        const { productName, weight, category, images, rating, price, stock } = req.body;

        // Validate that the images array contains at least 5 images
        if (!images || images.length < 5) {
            return res.status(400).json({ message: 'At least 5 images are required.' });
        }

        const newProduct = new Product({
            productName,
            weight,
            category,
            images,
            rating: rating || 0,  // Default rating to 0 if not provided
            price,
            stock: stock || 0  // Default stock to 0 if not provided
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single product by ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createProduct, deleteProduct, getAllProducts, getProductById}

