import User from "../models/user.js"; // Adjust the path based on your project structure

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



export { registerUser, loginUser };
