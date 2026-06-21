import { API_ENDPOINTS } from './endpoints';
import { request } from './apiClient';


const post = (url, data) => request({ method: 'POST', url, data });
const get = (url) => request({ method: 'GET', url });

export const loginUser = (username, password) => 
    post(API_ENDPOINTS.auth.login, { username, password });

export const registerUser = (username, password) => 
    post(API_ENDPOINTS.auth.register, { username, password });

export const fetchUsers = async () => {
    const data = await get(API_ENDPOINTS.users);
    return Array.isArray(data) ? data : (data?.users || []);
};

export const fetchChatHistory = (recipient) => 
    request({ url: API_ENDPOINTS.messages(recipient), method: 'GET' });

export const deleteMessageApi = (messageId) => 
    request({ url: `/api/messages/${messageId}`, method: 'DELETE' });