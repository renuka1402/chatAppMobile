import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { fetchUsers } from "../services/api";
import { clearSession, getSession } from "../utils/storage";

export default function UserListScreen({ navigation }) {
  const [users, setUsers] = useState([]);
  const [session, setSession] = useState({ token: "", username: "" });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadUsers = useCallback(async () => {
    try {
      const currentSession = await getSession();
      if (!currentSession.token) {
        navigation.replace("Login");
        return;
      }
      setSession(currentSession);
      const data = await fetchUsers(currentSession.token);
      setUsers(data || []);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Users Failed",
        text2: err.message || "Could not load users",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [navigation]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  useFocusEffect(
    useCallback(() => {
      loadUsers();
    }, [loadUsers])
  );

  const refresh = () => {
    setRefreshing(true);
    loadUsers();
  };

  const handleLogout = async () => {
    await clearSession();
    navigation.replace("Login");
  };

  const avatarColors = ["#075E54", "#128C7E", "#25D366", "#34B7F1", "#667781"];
  const getAvatarColor = (name) => {
    const idx = name ? name.charCodeAt(0) % avatarColors.length : 0;
    return avatarColors[idx];
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#075E54" />
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ChatApp</Text>
          <Text style={styles.subtitle}>@{session.username}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn} activeOpacity={0.7}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#075E54" />
        </View>
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
              onPress={() => navigation.navigate("Chat", { user: item })}
            >
              <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.username) }]}>
                <Text style={styles.avatarText}>
                  {item.username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.userTextWrap}>
                <View style={styles.rowTop}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.timeText}>now</Text>
                </View>
                <Text style={styles.userSub} numberOfLines={1}>Tap to start chatting</Text>
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

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFF" },
  header: {
    alignItems: "center",
    backgroundColor: "#075E54",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  title: { color: "#FFF", fontSize: 21, fontWeight: "800", letterSpacing: -0.3 },
  subtitle: { color: "#D9FDD3", fontSize: 12, marginTop: 2, fontWeight: "500" },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  logoutText: { color: "#FFF", fontSize: 13, fontWeight: "700" },
  center: { alignItems: "center", flex: 1, justifyContent: "center" },
  list: { paddingBottom: 90 },
  separator: { height: 1, backgroundColor: "#F0F0F0", marginLeft: 86 },
  userRow: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flexDirection: "row",
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  avatar: {
    alignItems: "center",
    borderRadius: 27,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "800" },
  userTextWrap: { flex: 1, marginLeft: 14 },
  rowTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  username: { color: "#111B21", fontSize: 17, fontWeight: "600" },
  timeText: { color: "#667781", fontSize: 12 },
  userSub: { color: "#667781", fontSize: 14, marginTop: 3 },
  empty: { alignItems: "center", paddingTop: 90 },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#DCF8C6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },
  emptyIcon: { fontSize: 34 },
  emptyTitle: { color: "#111B21", fontSize: 17, fontWeight: "700" },
  emptyText: { color: "#667781", fontSize: 13, marginTop: 6, fontWeight: "500" },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#25D366",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabIcon: { color: "#FFF", fontSize: 26, fontWeight: "700" },
});