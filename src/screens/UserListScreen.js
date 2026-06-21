import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import Toast from "react-native-toast-message";

import LoadingIndicator from "../components/LoadingIndicator";
import { fetchUsers } from "../services/api";
import { connectSocket, disconnectSocket } from "../services/socket";
import { clearSession, getSession } from "../utils/storage";
import styles from "../styles/userListStyles";
import { COLORS } from "../styles/colors";
import { ROUTES } from "../utils/constants";

export default function UserListScreen({ navigation, route }) {
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState({ token: "", username: "" });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isRefreshingList, setIsRefreshingList] = useState(false);

  const updateUserUnread = useCallback((username, message) => {
    setUsers((prevUsers) => {
      const existing = prevUsers.find((user) => user.username === username);
      if (!existing) return prevUsers;

      const updatedUsers = prevUsers.map((user) =>
        user.username === username
          ? {
              ...user,
              lastMessage: message.message || user.lastMessage,
              lastMessageAt: message.timestamp || user.lastMessageAt,
              unreadCount: (user.unreadCount || 0) + 1,
            }
          : user
      );

      return updatedUsers.sort((a, b) => {
        if (!a.lastMessageAt) return 1;
        if (!b.lastMessageAt) return -1;
        return new Date(b.lastMessageAt) - new Date(a.lastMessageAt);
      });
    });
  }, []);

  const loadUsers = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
      setIsRefreshingList(true);
    } else {
      setIsRefreshingList(true);
    }

    try {
      const currentSession = await getSession();
      if (!currentSession.token) {
        navigation.replace(ROUTES.LOGIN);
        return;
      }
      setSession(currentSession);
      
      const response = await fetchUsers(currentSession.token);
      const normalizedUsers = (response || []).map((user) => ({
        ...user,
        unreadCount: user.unreadCount || 0,
      }));

      setUsers(normalizedUsers);

      connectSocket(
        currentSession.token,
        (message) => {
          if (
            message?.sender &&
            message?.recipient &&
            currentSession.username &&
            message.recipient === currentSession.username &&
            message.sender !== currentSession.username
          ) {
            updateUserUnread(message.sender, message);
          }
        },
        () => {}
      );
    } catch (err) {
      console.error("[FRONTEND ERROR]", err);
      Toast.show({
        type: "error",
        text1: "Users Failed",
        text2: err.message || "Could not load users",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
      setIsRefreshingList(false);
    }
  }, [navigation, updateUserUnread]);

  useFocusEffect(
    useCallback(() => {
      const updatedChat = route.params?.updatedChat;

      if (updatedChat && users.length > 0) {
        setUsers((prevUsers) => {
          const filtered = prevUsers.filter(u => u.username.toLowerCase() !== updatedChat.username.toLowerCase());
          const targetUser = prevUsers.find(u => u.username.toLowerCase() === updatedChat.username.toLowerCase());

          if (targetUser) {
            const updatedUser = {
              ...targetUser,
              lastMessage: updatedChat.lastMessage,
              lastMessageAt: updatedChat.lastMessageAt,
              unreadCount: 0
            };
            return [updatedUser, ...filtered];
          }
          return prevUsers;
        });

        navigation.setParams({ updatedChat: undefined });
        loadUsers(false);
      } else {
        loadUsers(users.length === 0); 
      }
    }, [loadUsers, route.params?.updatedChat, users.length])
  );

  React.useEffect(() => {
    return () => {
      disconnectSocket();
    };
  }, []);

  const refresh = () => {
    setRefreshing(true);
    loadUsers(false);
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          style: "destructive",
          onPress: async () => {
            await clearSession();
            navigation.replace(ROUTES.LOGIN);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const getAvatarColor = (name) => {
    const idx = name ? name.charCodeAt(0) % COLORS.avatarPalette.length : 0;
    return COLORS.avatarPalette[idx];
  };

  const formatMessageTime = (dateString) => {
    if (!dateString) return "";
    const msgDate = new Date(dateString);
    const today = new Date();
    
    if (msgDate.toDateString() === today.toDateString()) {
      return msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    if (msgDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    
    return msgDate.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ChatApp</Text>
          <Text style={styles.subtitle}>@{session.username}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} activeOpacity={0.7}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading || isRefreshingList ? (
        <LoadingIndicator fullScreen style={styles.center} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id || item.username}
          refreshing={refreshing}
          onRefresh={refresh}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.empty}>
              <View style={styles.emptyIconCircle}>
                <Text style={styles.emptyIcon}>💬</Text>
              </View>
              <Text style={styles.emptyTitle}>No users found</Text>
              <Text style={styles.emptyText}>Register another account to chat.</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userRow}
              activeOpacity={0.6}
              onPress={() => navigation.navigate(ROUTES.CHAT, { user: item })}
            >
              <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.username) }]}>
                <Text style={styles.avatarText}>
                  {item.username ? item.username.charAt(0).toUpperCase() : '?'}
                </Text>
              </View>
              
              <View style={styles.userTextWrap}>
                <View style={styles.rowTop}>
                  <Text style={styles.username}>{item.username}</Text>
                  {/* Agar unread message hai toh time ka color WhatsApp green ho jayega */}
                  <Text style={[styles.timeText, item.unreadCount > 0 && styles.timeTextUnread]}>
                    {item.lastMessageAt ? formatMessageTime(item.lastMessageAt) : ""}
                  </Text>
                </View>
                <View style={styles.rowBottom}>
                  <Text style={styles.userSub} numberOfLines={1}>
                    {item.lastMessage ? item.lastMessage : "Tap to start chatting"}
                  </Text>
                  {item.unreadCount > 0 && (
                    <View style={styles.badgeContainer}>
                      <Text style={styles.badgeText}>{item.unreadCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={refresh}>
        <Text style={styles.fabIcon}>↻</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

