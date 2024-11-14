import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebase";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { notifications } from "@mantine/notifications";

export const AuthContext = createContext();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function logout() {
        notifications.show({
            message: "You have been logged out",
            color: "red",
            autoClose: 5000,
        });
        return signOut(auth);
    }
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{ user, loading, signInWithGoogle, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
