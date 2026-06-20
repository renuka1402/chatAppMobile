import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { setSession, clearSession } from '../utils/storage';

export const useAuth = (navigation) => {
    const [loading, setLoading] = useState(false);

    const register = async (username, password) => {
        if (!username.trim() || !password.trim()) {
            throw new Error('Please fill in all fields.');
        }
        setLoading(true);
        try {
            await registerUser(username.trim(), password);
            setLoading(false);
            return true;
        } catch (error) {
            setLoading(false);
            const errorMsg = error.response?.data?.error || 'Registration failed.';
            throw new Error(errorMsg);
            console.log('Registration error:', error);
        }
    };

    const login = async (username, password) => {
        if (!username.trim() || !password.trim()) {
            throw new Error('Please enter username and password.');
        }
        setLoading(true);
        try {
            const data = await loginUser(username.trim(), password);
            await setSession(data.token, data.username);
            setLoading(false);
            navigation.replace('Users');
        } catch (error) {
            setLoading(false);
            const errorMsg = error.response?.data?.error || 'Invalid credentials.';
            throw new Error(errorMsg);
        }
    };

    const logout = async () => {
        try {
            await clearSession();
            navigation.replace('Login');
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    return { loading, login, register, logout };
};
