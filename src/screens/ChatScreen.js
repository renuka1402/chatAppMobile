import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { useChat } from '../hooks/useChat';
import { useAuth } from '../hooks/useAuth';
import { ChatMessage } from '../components/ChatMessage';
import { ConnectionStatus } from '../components/ConnectionStatus';

export default function ChatScreen({ navigation, route }) {
    const chatUser = route.params?.user;
    const recipient = chatUser?.username;
    const { messages, status, currentUser, sendMessage } = useChat(recipient);
    const { logout } = useAuth(navigation);
    const [text, setText] = useState('');
    const flatListRef = useRef();

    const handleSend = () => {
        if (!text.trim()) return;
        sendMessage(text);
        setText('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#075E54" />

            {/* Header section */}
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
                <TouchableOpacity onPress={logout} activeOpacity={0.7}>
                    <Text style={styles.logoutBtn}>Logout</Text>
                </TouchableOpacity>
            </View>

            {/* Socket Status Indicator */}
         

            {/* Main Chat Layout Area — WhatsApp-style wallpaper background */}
            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
            >
                <View style={styles.wallpaper}>
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={(item) => item._id || Math.random().toString()}
                        renderItem={({ item }) => <ChatMessage item={item} isMyMessage={item.sender === currentUser} />}
                        contentContainerStyle={styles.listContent}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                    />
                </View>

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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#075E54' },
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#075E54',
    },
    backBtn: { paddingHorizontal: 6 },
    usersBtn: { color: '#FFF', fontSize: 28, fontWeight: '400' },
    headerAvatar: {
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#128C7E',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    },
    headerAvatarText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
    headerCenter: { flex: 1, marginLeft: 12 },
    headerTitle: { fontSize: 17, fontWeight: '600', color: '#FFF' },
    headerSub: { fontSize: 12, color: '#D9FDD3', marginTop: 1 },
    logoutBtn: { color: '#FFF', fontSize: 13, fontWeight: '600', opacity: 0.9, paddingHorizontal: 8 },

    // WhatsApp's classic light tan/beige chat wallpaper
    wallpaper: { flex: 1, backgroundColor: '#ECE5DD' },
    listContent: { padding: 12, paddingBottom: 14 },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 8,
        paddingVertical: 8,
        backgroundColor: '#ECE5DD',
    },
    inputBox: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 6,
        marginRight: 8,
        minHeight: 46,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    input: {
        fontSize: 15,
        color: '#111B21',
        maxHeight: 100,
        paddingVertical: 4,
    },
    sendBtn: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: '#25D366',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    sendBtnDisabled: { backgroundColor: '#A8D5BE', elevation: 0, shadowOpacity: 0 },
    sendIcon: { color: '#FFF', fontSize: 18, fontWeight: '700', marginLeft: 2 },
});