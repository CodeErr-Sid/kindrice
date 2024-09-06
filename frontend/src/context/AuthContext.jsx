// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { getCart } from '../api/cartapi';
import axios from 'axios';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
    const url = import.meta.env.VITE_BACKEND_URL;
    const currency = "₹"
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [idToken, setIdToken] = useState("");
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

    useEffect(() => {
        const getCartItems = async () => {
           if(isLoggedIn){
               const data = await getCart(idToken);
               setCart(data.items);
            }
            else{
                setCart([])
            }
        }

        getCartItems();
    },[idToken])


    return (
        <AuthContext.Provider value={{ isLoggedIn, user, url, idToken, cart, currency }}>
            {children}
        </AuthContext.Provider>
    );
};
