import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  description: { type: String, required: true },
  weightPrice: [{
    weight: {
      value: { type: Number, required: true },  // Numeric weight value
      unit: { type: String, required: true }    // Unit of measurement (e.g., kg)
    },
    sku: {  // Unique SKU for each weight category
      type: String,
      required: true
    },
    price: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    dimensions: { // Dimensions vary by weight category
      length: {
        type: Number,
        required: true  // Length of the package
      },
      breadth: {
        type: Number,
        required: true  // Breadth of the package
      },
      height: {
        type: Number,
        required: true  // Height of the package
      }
    }
  }],
  category: { type: String, required: true },
  images: {
    type: [String],  // Array of image URLs or paths
    validate: [images => images.length >= 5, 'At least 5 images required'],
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5000,  // Rating score out of 5000
    default: 0  // Default to 0 if not provided
  },
  stock: { type: Number },  // Optional field
  hsnCode: {
    type: String,
    required: true
  },
  taxPercentage: {
    type: Number,
    required: true  // Tax percentage based on the HSN code
  },
  isActive: {
    type: Boolean,
    default: true  // For managing active/inactive status of product
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
