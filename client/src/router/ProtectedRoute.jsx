import React from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    if (!localStorage.getItem('accessToken')) {
        navigate('/login');
        return;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
}
