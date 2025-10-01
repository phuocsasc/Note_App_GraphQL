import React, { useContext } from 'react';
import { Button, Typography } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { AuthContext } from '../context/AuthProvider';
import { Navigate } from 'react-router-dom';

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const res = await signInWithPopup(auth, provider);
            console.log({ res });
            // onIdTokenChanged will update context and routing will handle redirect
        } catch (err) {
            console.error('Login failed', err);
        }
    };

    if (user?.uid) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                Welcome to Note App
            </Typography>
            <Button variant="outlined" onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
        </>
    );
}
