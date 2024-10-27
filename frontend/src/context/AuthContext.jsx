import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { getCart } from '../api/cartapi';
import { getAddresses } from '../api/userapi';
import { guestGetCart } from '../api/localcartapi';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const currency = "₹";
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [idToken, setIdToken] = useState("");
    const [addresses, setAddresses] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                await refreshToken(user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
                setIdToken(""); // Reset idToken when user logs out
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const refreshToken = async (user) => {
        try {
            const token = await user.getIdToken(true); // Force refresh the token
            setIdToken(token);
        } catch (error) {
            console.error("Error refreshing token:", error);
        }
    };

    const getCartItems = async () => {
        try {
            if (isLoggedIn) {
                // Fetch cart from the backend if the user is logged in
                const data = await getCart(idToken);
                setCart(data.items);
                localStorage.setItem('cart', JSON.stringify(data.items)); // Sync to localStorage
            } else {
                // Use cart from localStorage for guest users
                const localCart = await guestGetCart() || [];
                setCart(localCart);
            }
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCart([]); // Fallback to an empty cart on error
        }
    };

    const getBillingInformation = async () => {
        try {
            if (isLoggedIn) {
                const response = await getAddresses(idToken);
                setAddresses(response?.addresses);
            } else {
                setAddresses([]);
            }
        } catch (error) {
            console.error(error);
            setAddresses([]);
        }
    };

    useEffect(() => {
        getCartItems(); // Fetch cart whenever isLoggedIn or idToken changes
        if (isLoggedIn) {
            getBillingInformation();
        }
    }, [isLoggedIn, idToken, cart]); // Add isLoggedIn to dependencies

    return (
        <AuthContext.Provider value={{ isLoggedIn, addresses, url, user, refreshToken, idToken, cart, currency, getCartItems }}>
            {children}
        </AuthContext.Provider>
    );
};
