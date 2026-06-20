import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import authStyles from '../styles/authStyles';
import { showErrorToast } from '../utils/toast';
import { validateLoginForm, hasValidationErrors } from '../utils/validation';

export default function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { loading, login } = useAuth(navigation);

    const validate = () => {
        const newErrors = validateLoginForm({ username, password });
        setErrors(newErrors);
        return !hasValidationErrors(newErrors);
    };

    const handleLogin = async () => {
        if (!validate()) return;

        try {
            await login(username.trim(), password);
        } catch (error) {
            showErrorToast('Login Failed', error.message || 'Something went wrong');
        }
    };

    return (
        <SafeAreaView style={authStyles.container} edges={['top', 'bottom']}>
            <View style={authStyles.formContainer}>
                {/* Brand / Logo Header Area */}
                <View style={authStyles.headerArea}>
                    <View style={authStyles.logoCircle}>
                        <Text style={authStyles.logoEmoji}>💬</Text>
                    </View>
                    <Text style={authStyles.title}>Welcome Back</Text>
                    <Text style={authStyles.subtitle}>Sign in to continue your conversations</Text>
                </View>

                {/* Input Fields */}
                <View style={authStyles.inputWrapper}>
                    <Text style={authStyles.inputLabel}>Username</Text>
                    <TextInput
                        style={[authStyles.input, errors.username ? authStyles.inputError : null]}
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={(text) => {
                            setUsername(text);
                            if (errors.username) setErrors((prev) => ({ ...prev, username: '' }));
                        }}
                        autoCapitalize="none"
                        placeholderTextColor="#999"
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
                            if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                        }}
                        autoCapitalize="none"
                        placeholderTextColor="#999"
                    />
                    {errors.password ? <Text style={authStyles.errorText}>{errors.password}</Text> : null}
                </View>

                {/* Primary Action Button */}
                <TouchableOpacity
                    style={[authStyles.button, loading && authStyles.buttonDisabled]}
                    onPress={handleLogin}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                        <Text style={authStyles.buttonText}>Sign In</Text>
                    )}
                </TouchableOpacity>

                {/* Navigation Switch Link */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Register')}
                    activeOpacity={0.7}
                    style={authStyles.switchContainer}
                >
                    <Text style={authStyles.switchTextNormal}>Don't have an account? </Text>
                    <Text style={authStyles.switchTextBold}>Register here</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
