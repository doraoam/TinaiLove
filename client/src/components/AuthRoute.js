// src/components/AuthRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRoute = ({ children }) => {
    const { authToken } = useAuth(); // This will now properly retrieve the auth state

    if (!authToken) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default AuthRoute;
