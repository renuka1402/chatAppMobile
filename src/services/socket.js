import { io } from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

let socket = null;

export const connectSocket = (token, onMessageReceived, onStatusChange) => {
    if (socket) socket.disconnect();

    socket = io(SOCKET_URL, {
        auth: { token },
        transports: ['websocket', 'polling']
    });

    socket.on('connect', () => onStatusChange('connected'));
    socket.on('disconnect', () => onStatusChange('disconnected'));
    socket.on('connect_error', () => onStatusChange('reconnecting'));
    socket.on('receive_message', onMessageReceived);
};

export const emitMessage = (message, recipient) => {
    if (socket?.connected) {
        socket.emit('send_message', { message, recipient });
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
};