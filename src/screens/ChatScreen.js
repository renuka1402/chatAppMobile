import React, { useState, useRef, useMemo } from 'react';
import { 
    StyleSheet, View, TextInput, TouchableOpacity, Text, 
    FlatList, KeyboardAvoidingView, Platform, SafeAreaView, 
    StatusBar, Alert 
} from 'react-native';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';
import { ChatMessage } from '../components/ChatMessage';
import { ConnectionStatus } from '../components/ConnectionStatus';
import { formatDateHeader } from '../utils/date'; 
import styles from "../styles/chatScreenStyles";

export default function ChatScreen({ navigation, route }) {
    const chatUser = route.params?.user;
    const recipient = chatUser?.username;
    const { messages, status, currentUser, sendMessage, deleteMessage } = useChat(recipient);
    const { logout } = useAuth(navigation);
    const [text, setText] = useState('');
    const flatListRef = useRef();

  
    const groupedMessages = useMemo(() => {
        const groups = [];
        let lastDate = null;

        messages.forEach((msg) => {
            const dateHeader = formatDateHeader(msg.timestamp);
            if (dateHeader !== lastDate) {
                groups.push({ type: 'header', title: dateHeader, _id: 'header-' + msg.timestamp });
                lastDate = dateHeader;
            }
            groups.push({ type: 'message', ...msg });
        });
        return groups;
    }, [messages]);

    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text);
        setText('');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#075E54" />

            <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 25} 
            >
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7} style={styles.backBtn}>
                        <Text style={styles.usersBtn}>‹</Text>
                    </TouchableOpacity>
                    <View style={styles.headerAvatar}>
                        <Text style={styles.headerAvatarText}>
                            {recipient ? recipient.charAt(0).toUpperCase() : '?'}
                        </Text>
                    </View>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle} numberOfLines={1}>{recipient || 'Chat'}</Text>
                        <ConnectionStatus status={status} />
                    </View>
                </View>

                {/* Chat History List */}
                <View style={styles.wallpaper}>
                    <FlatList
                        ref={flatListRef}
                        data={groupedMessages}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => {
                            if (item.type === 'header') {
                                return (
                                    <View style={styles.dateHeader}>
                                        <Text style={styles.dateHeaderText}>{item.title}</Text>
                                    </View>
                                );
                            }
                            return (
                                <ChatMessage 
                                    item={item} 
                                    isMyMessage={item.sender === currentUser}
                                    onLongPress={() => {
                                        if (item.sender === currentUser) {
                                            Alert.alert(
                                                "Delete Message",
                                                "Are you sure you want to delete this message?",
                                                [
                                                    { text: "Cancel", style: "cancel" },
                                                    { text: "Delete", style: "destructive", onPress: () => deleteMessage(item._id) }
                                                ]
                                            );
                                        }
                                    }}
                                />
                            );
                        }}
                        contentContainerStyle={styles.listContent}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
                    />
                </View>

                {/* Input Bar */}
                <View style={styles.inputContainer}>
                    <View style={styles.inputBox}>
                        <TextInput
                            style={styles.input}
                            placeholder="Type a message"
                            value={text}
                            onChangeText={setText}
                            placeholderTextColor="#8696A0"
                            multiline
                        />
                    </View>
                    <TouchableOpacity
                        style={[styles.sendBtn, !text.trim() && styles.sendBtnDisabled]}
                        onPress={handleSend}
                        activeOpacity={0.8}
                        disabled={!text.trim()}
                    >
                        <Text style={styles.sendIcon}>➤</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}