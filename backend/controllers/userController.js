import User from "../models/user.js"; // Adjust the path based on your project structure
import Subscriber from "../models/subscriber.js";

const registerUser = async (req, res) => {
    const { firebaseUID, email, name } = req.body;

    try {
        // Check if the user already exists in MongoDB
        let user = await User.findOne({ firebaseUID });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user document in MongoDB
        user = new User({
            firebaseUID,
            email,
            name,
            // Add other necessary fields as per your schema
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const loginUser = async (req, res) => {
    const { firebaseUID } = req.body;

    try {
        // Find the user in MongoDB by Firebase UID
        const user = await User.findOne({ firebaseUID });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Return user data
        res.status(200).json({ message: "Login successful", user });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
};

const createNewSubscriber = async (req, res) => {
    const { email } = req.body;

    if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Create a new subscriber
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();

        res.status(200).json({ success: true, message: 'Successfully subscribed to the newsletter' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            res.status(409).json({ success: false, error: 'Email already subscribed' });
        } else {
            res.status(500).json({ success: false, error: 'An error occurred while subscribing' });
        }
    }
}



export { registerUser, loginUser, createNewSubscriber };
