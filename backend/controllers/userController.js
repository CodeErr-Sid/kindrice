import User from "../models/user.js"; // Adjust the path based on your project structure
import Subscriber from "../models/subscriber.js";
import admin from "../config/firebase.js";

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

const isEmailVerified = async (email) => {
    try {
        const userRecord = await admin.auth().getUserByEmail(email);
        return userRecord.emailVerified; // This will return true if email is verified, otherwise false
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

const sendAwbToCustomer = async (email, message) => {

}

const getUserBillingInformation = async (req, res) => {
    const userId = req.userId;
    const addresses = [];

    try {
        // Find the user in MongoDB by Firebase UID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Map through the user's addresses and format them
        user.addresses.forEach(address => {
            const formattedAddress = {
                firstname: address.firstname,
                addressLine1: address.addressLine1,
                zipcode: address.zipcode,
                city: address.city,
                state: address.state,
                country: address.country,
                phonenumber: address.phonenumber,
                email: address.email
            };

            // Optionally add lastname if it exists
            if (address.lastname) {
                formattedAddress.lastname = address.lastname;
            }

            addresses.push(formattedAddress);
        });

        // Return user data
        res.status(200).json({ message: "User exists", addresses });

    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const saveAddressToUser = async (orderData, userId) => {
    try {
        // Extracting billing details from orderData
        const address = {
            firstname: orderData.billing_customer_name,
            lastname: orderData.billing_last_name,
            addressLine1: orderData.billing_address,
            city: orderData.billing_city,
            zipcode: orderData.billing_pincode,
            state: orderData.billing_state,
            country: orderData.billing_country,
            email: orderData.billing_email,
            phonenumber: orderData.billing_phone,
            shippingAddress: {}  // Initialize empty shippingAddress
        };

        // Find the user by userId
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Check if the billing address already exists in the user's addresses array
        let addressExists = false;
        let addressIndex = -1;

        user.addresses.forEach((addr, index) => {
            if (
                addr.addressLine1 === address.addressLine1 &&
                addr.city === address.city &&
                addr.zipcode === address.zipcode &&
                addr.state === address.state &&
                addr.country === address.country &&
                addr.phonenumber === address.phonenumber
            ) {
                addressExists = true;
                addressIndex = index;  // Store the index for updating later
            }
        });

        // If shipping_is_billing is false, add the shipping address as an object
        if (!orderData.shipping_is_billing) {
            const shippingAddressObject = {
                customer_name: orderData.shipping_customer_name || "",
                last_name: orderData.shipping_last_name || "",
                address: orderData.shipping_address || "",
                address_2: orderData.shipping_address_2 || "",
                city: orderData.shipping_city || "",
                pincode: orderData.shipping_pincode || "",
                country: orderData.shipping_country || "",
                state: orderData.shipping_state || "",
                email: orderData.shipping_email || "",
                phone: orderData.shipping_phone || ""
            };

            // Assign shippingAddress to the address object
            address.shippingAddress = shippingAddressObject;
        }

        // Update or add the address in the user's addresses array
        if (addressExists) {
            // Update the existing address
            user.addresses[addressIndex] = address;
            return { success: true, message: 'Address updated successfully' };
        } else {
            // Add the new address to the addresses array
            user.addresses.push(address);
            return { success: true, message: 'Billing address added successfully' };
        }

        await user.save();  // Save the updated user document
    } catch (error) {
        console.error('Error saving address:', error);
        return { success: false, message: 'Error saving address', error };
    }
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



export { registerUser, loginUser, createNewSubscriber, getUserBillingInformation, saveAddressToUser, isEmailVerified };
