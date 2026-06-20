import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';
import authStyles from '../styles/authStyles';
import { showErrorToast, showSuccessToast } from '../utils/toast';
import { validateRegisterForm, hasValidationErrors } from '../utils/validation';

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ username: '', password: '' });
    const { loading, register } = useAuth(navigation);

    const validate = () => {
        const newErrors = validateRegisterForm({ username, password });
        setErrors(newErrors);
        return !hasValidationErrors(newErrors);
    };

    const handleRegister = async () => {
        if (!validate()) return;

        try {
            await register(username.trim(), password);
            showSuccessToast('Account Created', 'Please login to continue');
            navigation.navigate('Login');
        } catch (error) {
            showErrorToast('Registration Failed', error.message || 'Something went wrong');
        }
    };

    return (
        <SafeAreaView style={authStyles.container} edges={['top', 'bottom']}>
            <View style={authStyles.formContainer}>
                <View style={authStyles.headerArea}>
                    <View style={authStyles.logoCircle}>
                        <Text style={authStyles.logoEmoji}>✨</Text>
                    </View>
                    <Text style={authStyles.title}>Create Account</Text>
                    <Text style={authStyles.subtitle}>Connect with friends globally in real-time</Text>
                </View>

                <View style={authStyles.inputWrapper}>
                    <Text style={authStyles.inputLabel}>Username</Text>
                    <TextInput
                        style={[authStyles.input, errors.username ? authStyles.inputError : null]}
                        placeholder="Choose a unique username"
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
                        placeholder="Minimum 6 characters"
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

                <TouchableOpacity
                    style={[authStyles.button, loading && authStyles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" size="small" />
                    ) : (
                        <Text style={authStyles.buttonText}>Get Started</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.7}
                    style={authStyles.switchContainer}
                >
                    <Text style={authStyles.switchTextNormal}>Already have an account? </Text>
                    <Text style={authStyles.switchTextBold}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
