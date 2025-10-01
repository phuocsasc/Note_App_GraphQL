import React, { createContext, useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const auth = getAuth();

    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged((user) => {
            console.log('[Form AuthProvider]', user);
            if (user?.uid) {
                setUser(user);
                // store a lightweight presence flag if needed by other parts
                localStorage.setItem('isAuthenticated', 'true');
                return;
            }
            // reset user info
            setUser({});
            localStorage.removeItem('isAuthenticated');
        });

        return () => {
            unsubscribed();
        };
    }, [auth]);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
