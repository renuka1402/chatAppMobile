import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LoadingIndicator from '../components/LoadingIndicator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import UserListScreen from '../screens/UserListScreen';
import ChatScreen from '../screens/ChatScreen';
import { ROUTES } from '../utils/constants';
import { getSession } from '../utils/storage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { token } = await getSession();
                if (token) setUserToken(token);
            } catch (e) {
                console.log('Session read error');
            } finally {
                setIsLoading(false);
            }
        };
        checkSession();
    }, []);

    if (isLoading) {
        return <LoadingIndicator fullScreen />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={userToken ? ROUTES.USERS : ROUTES.LOGIN}>
                <Stack.Screen name={ROUTES.LOGIN} component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.REGISTER} component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.USERS} component={UserListScreen} options={{ headerShown: false }} />
                <Stack.Screen name={ROUTES.CHAT} component={ChatScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
