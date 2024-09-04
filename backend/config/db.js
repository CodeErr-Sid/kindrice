import mongoose from 'mongoose';
import dotenv from "dotenv"

dotenv.config();

// Replace with your actual MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => { 
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;