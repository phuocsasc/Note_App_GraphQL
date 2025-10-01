import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

export default function ProtectedRoute({ children }) {
    const { user } = useContext(AuthContext);
    if (!user?.uid) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
