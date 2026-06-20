import { useState, useEffect } from 'react';
import { connectSocket, emitMessage, disconnectSocket } from '../services/socket';
import { fetchChatHistory } from '../services/api';
import { getSession } from '../utils/storage';

export const useChat = (recipient) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState('connecting');
    const [currentUser, setCurrentUser] = useState('');

    useEffect(() => {
        let isMounted = true;

        const initChat = async () => {
            const { token, username } = await getSession();
            console.log('[chat:init]', {
                username,
                recipient,
                hasToken: Boolean(token)
            });
            if (isMounted) setCurrentUser(username);

            if (!recipient) {
                console.log('[chat:init:skip] recipient missing');
                return;
            }

            try {
                const history = await fetchChatHistory(token, recipient);
                console.log('[chat:history:loaded]', history.length);
                if (isMounted) setMessages(history);
            } catch (err) {
                console.log('[chat:history:error]', err.message);
            }

            connectSocket(
                token,
                (newMessage) => {
                    const belongsHere =
                        (newMessage.sender === username && newMessage.recipient === recipient) ||
                        (newMessage.sender === recipient && newMessage.recipient === username);
                    console.log('[chat:message:received]', {
                        sender: newMessage.sender,
                        recipient: newMessage.recipient,
                        belongsHere
                    });
                    if (isMounted && belongsHere) setMessages((prev) => [...prev, newMessage]);
                },
                (newStatus) => {
                    console.log('[chat:socket_status]', newStatus);
                    if (isMounted) setStatus(newStatus);
                }
            );
        };

        initChat();

        return () => {
            isMounted = false;
            disconnectSocket();
        };
    }, [recipient]);

    const sendMessage = (text) => {
        if (text.trim()) {
            console.log('[chat:send]', { recipient, hasText: true });
            emitMessage(text, recipient);
        }
    };

    return { messages, status, currentUser, sendMessage };
};
