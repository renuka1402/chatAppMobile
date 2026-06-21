import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/chatMessageStyles';

export const ChatMessage = ({ item, isMyMessage, onLongPress }) => (
    // TouchableOpacity add kiya taaki press events register ho sakein
    <TouchableOpacity 
        onLongPress={onLongPress} 
        activeOpacity={0.7} 
        disabled={!isMyMessage} // Sirf apne messages par delete allow karne ke liye
    >
        <View style={[styles.bubble, isMyMessage ? styles.myBubble : styles.otherBubble]}>
            <Text style={styles.sender}>{item.sender}</Text>
            <Text style={styles.messageText}>{item.message}</Text>
            <Text style={styles.time}>
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
        </View>
    </TouchableOpacity>
);