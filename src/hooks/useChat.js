import { useState, useEffect } from 'react';
import { connectSocket, emitMessage, disconnectSocket } from '../services/socket';
import { fetchChatHistory,deleteMessageApi } from '../services/api';
import { getSession } from '../utils/storage';

export const useChat = (recipient) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('connecting');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        if (!recipient) return;

        const initChat = async () => {
            const { token, username } = await getSession();
            setCurrentUser(username);

            try {
               const history = await fetchChatHistory(recipient);
                setMessages(history);
            } catch (err) {
                console.error('History load error:', err);
            }

            connectSocket(
                token,
                (msg) => {
                    const isChat = (msg.sender === username && msg.recipient === recipient) ||
                        (msg.sender === recipient && msg.recipient === username);
                    if (isChat) setMessages((prev) => [...prev, msg]);
                },
                setStatus
            );
        };

        initChat();
        return () => disconnectSocket();
    }, [recipient]);

    const sendMessage = (text) => {
        if (text.trim()) emitMessage(text, recipient);
    };

    const unreadCount = messages.filter(m => m.sender === recipient && !m.isRead).length;

    const deleteMessage = async (messageId) => {
        try {
            await deleteMessageApi(messageId); 
            setMessages(prev => prev.filter(m => m._id !== messageId));
        } catch (err) {
            console.error(err);
        }
    };

    return { messages, status, currentUser, sendMessage,unreadCount, deleteMessage, };
};