import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, STORAGE_KEYS } from "../utils/constants";

async function readJsonResponse(res, fallbackMessage) {
  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) throw new Error(data.message || fallbackMessage);
  return data;
}

export const authService = {
  async register(username, password) {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return readJsonResponse(res, "Registration failed");
  },

  async login(username, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    return readJsonResponse(res, "Login failed");
  },

  async getUsers(token) {
    const res = await fetch(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return readJsonResponse(res, "Users failed");
  },

  async getMessages(token, recipient) {
    const encodedRecipient = encodeURIComponent(recipient);
    const res = await fetch(`${API_URL}/messages/${encodedRecipient}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return readJsonResponse(res, "Messages failed");
  },

  async saveSession(token, username) {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.TOKEN, token],
      [STORAGE_KEYS.USERNAME, username],
    ]);
  },

  async getSession() {
    const values = await AsyncStorage.multiGet([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USERNAME,
    ]);
    const token = values[0][1];
    const username = values[1][1];
    if (!token || !username) return null;
    return { token, username };
  },

  async clearSession() {
    await AsyncStorage.multiRemove([STORAGE_KEYS.TOKEN, STORAGE_KEYS.USERNAME]);
  },
};
