import React, { createContext, useContext, useState, useEffect } from 'react';
import { authenticateUser, initializeUser, initializeDemoUser, getLoggedInUserId, setLoggedInUserId, getUserData } from '../lib/dataManager';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Init demo user on first load
        initializeDemoUser();

        // Check for existing session
        const savedUserId = getLoggedInUserId();
        if (savedUserId) {
            const users = JSON.parse(localStorage.getItem('finance_app_users') || '{}');
            const user = users[savedUserId];
            if (user) {
                setCurrentUser({ id: user.id, name: user.name, email: user.email });
                setUserData(user.data);
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const user = authenticateUser(email, password);
        if (user) {
            setCurrentUser({ id: user.id, name: user.name, email: user.email });
            setUserData(user.data);
            setLoggedInUserId(user.id);
            return true;
        }
        return false;
    };

    const register = (name, email, password) => {
        try {
            const userId = Date.now().toString(); // Simple ID generation
            const newUser = initializeUser(userId, name, email, password);
            setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
            setUserData(newUser.data);
            setLoggedInUserId(newUser.id);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setUserData(null);
        setLoggedInUserId(null);
    };

    const value = {
        currentUser,
        userData,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
