import admin from "../config/firebase.js";
import User from "../models/user.js";

const authMiddleware = async (req, res, next) => {
    try {
        const idToken = req.headers.authorization?.split('Bearer ')[1];
        if (!idToken) {
            return res.status(401).json({ message: 'Unauthorized: No token provided' });
        }

        // Verify the Firebase ID token
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const firebaseUID = decodedToken.uid;

        // Find the user in MongoDB using the Firebase UID
        const user = await User.findOne({ firebaseUID });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach the user's MongoDB ID to the req object
        req.userId = user._id;

        next();
    } catch (error) {
        console.error('Error verifying Firebase ID token:', error);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

export default authMiddleware;
