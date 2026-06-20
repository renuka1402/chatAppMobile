import axios from 'axios';
import { API_URL } from '../utils/constants';

const BASE_URL = API_URL;

// --- LOGIN API ---
export const loginUser = async (username, password) => {
    console.log(`[API] Attempting Login for username: "${username}" at ${BASE_URL}/api/login`);
    try {
        const response = await axios.post(`${BASE_URL}/api/login`, { username, password });
        console.log('[API] Login Success! Token received:', response.data?.token ? "YES" : "NO");
        return response.data;
    } catch (error) {
        console.error('[API] Login Axios Error:', {
            message: error.message,
            backendResponse: error.response?.data,
            status: error.response?.status
        });
        throw error; // Hook tak error pahunchane ke liye
    }
};

// --- REGISTER API ---
export const registerUser = async (username, password) => {
    console.log(`[API] Attempting Registration for username: "${username}" at ${BASE_URL}/api/register`);
    try {
        const response = await axios.post(`${BASE_URL}/api/register`, { username, password });
        console.log('[API] Registration Success! Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('[API] Registration Axios Error:', {
            message: error.message,
            backendResponse: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

// --- CHAT HISTORY API ---
export const fetchUsers = async (token) => {
    console.log(`[API] Fetching users from ${BASE_URL}/api/users`);
    try {
        const response = await axios.get(`${BASE_URL}/api/users`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data.users || [];
    } catch (error) {
        console.error('[API] Fetch Users Axios Error:', {
            message: error.message,
            backendResponse: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};

// --- CHAT HISTORY API ---
export const fetchChatHistory = async (token, recipient) => {
    const encodedRecipient = encodeURIComponent(recipient);
    console.log(`[API] Fetching chat history from ${BASE_URL}/api/messages/${encodedRecipient}`);
    try {
        const response = await axios.get(`${BASE_URL}/api/messages/${encodedRecipient}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log(`[API] Fetch History Success! Total messages fetched: ${response.data?.length || 0}`);
        return response.data;
    } catch (error) {
        console.error('[API] Fetch History Axios Error:', {
            message: error.message,
            backendResponse: error.response?.data,
            status: error.response?.status
        });
        throw error;
    }
};
