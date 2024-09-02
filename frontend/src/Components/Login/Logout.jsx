import React from 'react';
import { logout } from '../../config/firebase'

const LogoutButton = () => {
    const handleLogout = async () => {
        await logout();
        // Redirect to login page or update UI accordingly
        window.location.href = '/login'; // or use a routing library to navigate
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
