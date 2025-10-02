import React, { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { graphqlRequest } from "../utils/request";

export default function Login() {
    const auth = getAuth();
    const { user } = useContext(AuthContext);

    const handleLoginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const {
                user: { uid, displayName },
            } = await signInWithPopup(auth, provider);
            const { data } = await graphqlRequest({
                query: `mutation Register($uid: String!, $name: String!) {
                register(uid: $uid, name: $name) {
                    uid
                    name
                }
            }`,
                variables: { uid, name: displayName },
            });
            console.log("register", { data });
            // onIdTokenChanged will update context and routing will handle redirect
        } catch (err) {
            console.error("Login failed", err);
        }
    };

    if (user?.uid) {
        return <Navigate to="/" replace />;
    }

    return (
        <>
            <Typography variant="h5" sx={{ marginBottom: "10px" }}>
                Welcome to Note App
            </Typography>
            <Button variant="outlined" onClick={handleLoginWithGoogle}>
                Login with Google
            </Button>
        </>
    );
}
