// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../config/firebase';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user);
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        });

        return () => unsubscribe(); // Clean up subscription on unmount
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, user }}>
            {children}
        </AuthContext.Provider>
    );
};
