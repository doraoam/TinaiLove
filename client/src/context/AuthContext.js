// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

    console.log("authToken", authToken);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        console.log("token in");
        setAuthToken(token);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        console.log("token out");
        setAuthToken(null);
    };

    return (
        <AuthContext.Provider value={{ authToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
