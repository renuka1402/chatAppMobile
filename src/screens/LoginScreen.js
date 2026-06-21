import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAuth } from '../hooks/useAuth';
import authStyles from '../styles/authStyles';
import { COLORS } from '../styles/colors';
import { ROUTES } from '../utils/constants';
import { showErrorToast } from '../utils/toast';
import { validateLoginForm } from '../utils/validation';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { loading, login } = useAuth(navigation);

    const handleLogin = async () => {
        const newErrors = validateLoginForm({ username, password });
        if (newErrors.username || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        try {
            await login(username.trim(), password);
        } catch (error) {
            showErrorToast('Login Failed', error.message);
        }
    };

    return (
        <SafeAreaView style={authStyles.container}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} keyboardShouldPersistTaps="handled">
                    <View style={authStyles.formContainer}>
                        
                        <View style={authStyles.headerArea}>
                          
                            <Text style={authStyles.title}>Welcome Back</Text>
                        </View>

                        <View style={authStyles.inputWrapper}>
                            <Text style={authStyles.inputLabel}>Username</Text>
                            <TextInput
                                style={[authStyles.input, errors.username ? authStyles.inputError : null]}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    setErrors({ ...errors, username: '' });
                                }}
                                autoCapitalize="none"
                            />
                            {errors.username ? <Text style={authStyles.errorText}>{errors.username}</Text> : null}
                        </View>

                        <View style={authStyles.inputWrapper}>
                            <Text style={authStyles.inputLabel}>Password</Text>
                            <TextInput
                                style={[authStyles.input, errors.password ? authStyles.inputError : null]}
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    setErrors({ ...errors, password: '' });
                                }}
                                autoCapitalize="none"
                            />
                            {errors.password ? <Text style={authStyles.errorText}>{errors.password}</Text> : null}
                        </View>

                        <TouchableOpacity style={authStyles.button} onPress={handleLogin} disabled={loading}>
                            {loading ? (
                                <LoadingIndicator size="small" color={COLORS.white} />
                            ) : (
                                <Text style={authStyles.buttonText}>Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate(ROUTES.REGISTER)} style={authStyles.switchContainer}>
                            <Text style={authStyles.switchTextNormal}>Don't have an account? </Text>
                            <Text style={authStyles.switchTextBold}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}