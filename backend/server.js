import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import cartRouter from "./routes/cartroutes.js"; 
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRouter from "./routes/userroutes.js";
import productRouter from "./routes/productroutes.js";

dotenv.config();

// App configuration
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Define allowed origins
const allowedOrigins = [
  process.env.FRONTEND_URL, // Ensure this is set correctly in the environment
  'http://localhost:5173', // Local development
  'https://kindrice-chi.vercel.app', // Razorpay branch frontend
  'https://www.kindrice.co' // Production frontend
];

// CORS Options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200 
};

// CORS Middleware
app.use(cors(corsOptions));

// API Routes
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Connect to the database
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("API Working");
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
