import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ChatMessage = ({ item, isMyMessage }) => (
    <View style={[styles.bubble, isMyMessage ? styles.myBubble : styles.otherBubble]}>
        <Text style={styles.sender}>{item.sender}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
        <Text style={styles.time}>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
    </View>
);

const styles = StyleSheet.create({
    bubble: { padding: 10, borderRadius: 12, marginVertical: 4, maxWidth: '75%' },
    myBubble: { backgroundColor: '#44b767', alignSelf: 'flex-end' },
    otherBubble: { backgroundColor: '#E5E5EA', alignSelf: 'flex-start' },
    sender: { fontSize: 11, fontWeight: '600', color: '#555', marginBottom: 2 },
    messageText: { fontSize: 15, color: '#000' },
    time: { fontSize: 9, color: '#000000', alignSelf: 'flex-end', marginTop: 4 }
});