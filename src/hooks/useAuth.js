import { useState } from 'react';
import { loginUser, registerUser } from '../services/api';
import { setSession, clearSession } from '../utils/storage';

export const useAuth = (navigation) => {
    const [loading, setLoading] = useState(false);

    const register = async (username, password) => {
        if (!username.trim() || !password.trim()) throw new Error('Please fill in all fields.');
        
        setLoading(true);
        try {
            await registerUser(username.trim(), password);
        } catch (err) {
            throw new Error(err.response?.data?.error || 'Registration failed.');
        } finally {
            setLoading(false);
        }
    };

 const login = async (username, password) => {
    setLoading(true);
    try {
        const response = await loginUser(username.trim(), password);
        const token = response.token; 
        const user = response.username;
    
        if (token) {
            await setSession(token, user);
            navigation.replace('Users');
        } else {
            throw new Error('Login failed: No token received.');
        }
    } catch (err) {
        console.log('Login Error Log:', err);
        throw new Error(err.message);
    } finally {
        setLoading(false);
    }
};

    const logout = async () => {
        await clearSession();
        navigation.replace('Login');
    };

    return { loading, login, register, logout };
};