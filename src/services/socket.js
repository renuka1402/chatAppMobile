import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

let socket = null;

export const connectSocket = (token, onMessageReceived, onStatusChange) => {
    console.log('[socket:client:init]', {
        url: SOCKET_URL,
        hasToken: Boolean(token)
    });

    if (socket) {
        console.log('[socket:client:cleanup_old]', socket.id);
        socket.disconnect();
        socket = null;
    }

    socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['polling', 'websocket']
    });

    socket.on('connect', () => {
        console.log('[socket:client:connect]', {
            id: socket.id,
            transport: socket.io.engine.transport.name
        });
        onStatusChange('connected');
    });

    socket.io.engine.on('upgrade', (transport) => {
        console.log('[socket:client:upgrade]', transport.name);
    });

    socket.on('disconnect', (reason) => {
        console.log('[socket:client:disconnect]', reason);
        onStatusChange('disconnected');
    });

    socket.on('connect_error', (error) => {
        console.log('[socket:client:connect_error]', error.message);
        onStatusChange('reconnecting');
    });

    socket.on('receive_message', (message) => {
        console.log('[socket:client:receive_message]', {
            id: message._id,
            sender: message.sender,
            recipient: message.recipient
        });
        onMessageReceived(message);
    });
};

export const emitMessage = (message, recipient) => {
    if (!socket) {
        console.log('[socket:client:send_failed] socket not initialized');
        return;
    }

    console.log('[socket:client:send_message]', {
        connected: socket.connected,
        recipient,
        hasText: Boolean(message?.trim())
    });

    socket.emit('send_message', { message, recipient }, (response) => {
        console.log('[socket:client:send_ack]', response);
    });
};

export const disconnectSocket = () => {
    if (socket) {
        console.log('[socket:client:manual_disconnect]', socket.id);
        socket.disconnect();
        socket = null;
    }
};
