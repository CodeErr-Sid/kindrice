// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { getCart } from '../api/cartapi';
import axios from 'axios';
import { getAddresses } from '../api/userapi';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const currency = "₹"
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [idToken, setIdToken] = useState("");
    const [addresses, setAddresses] = useState([])
    const [cart, setCart] = useState([]);

    // Function to register a user

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
                const token = await user.getIdToken();
                setIdToken(token);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    const getCartItems = async () => {
        if (isLoggedIn) {
            const data = await getCart(idToken);
            setCart(data.items);
        }
        else {
            setCart([])
        }
    }

    const getBillingInformation = async () => {
        try {
            if (isLoggedIn) {
                const response = await getAddresses(idToken);
                setAddresses(response?.addresses)
            } else {
                setAddresses([])
            }
        } catch (error) {
            console.error(error);
            setAddresses([]);
        }
    }

    useEffect(() => {
        getCartItems();
        getBillingInformation();
    }, [idToken])




    return (
        <AuthContext.Provider value={{ isLoggedIn, addresses, url, idToken, cart, currency, getCartItems }}>
            {children}
        </AuthContext.Provider>
    );
};
