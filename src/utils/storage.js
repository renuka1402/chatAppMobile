import AsyncStorage from '@react-native-async-storage/async-storage';

export const setSession = async (token, username) => {
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('username', username);
};

export const getSession = async () => {
    const token = await AsyncStorage.getItem('userToken');
    const username = await AsyncStorage.getItem('username');
    return { token, username };
};

export const clearSession = async () => {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('username');
};