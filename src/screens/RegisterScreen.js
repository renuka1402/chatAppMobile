import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingIndicator from '../components/LoadingIndicator';
import { useAuth } from '../hooks/useAuth';
import authStyles from '../styles/authStyles';
import { COLORS } from '../styles/colors';
import { ROUTES } from '../utils/constants';
import { showErrorToast, showSuccessToast } from '../utils/toast';
import { validateRegisterForm } from '../utils/validation';

export default function RegisterScreen({ navigation }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const { loading, register } = useAuth(navigation);

    const handleRegister = async () => {
        const newErrors = validateRegisterForm({ username, password });
        if (newErrors.username || newErrors.password) {
            setErrors(newErrors);
            return;
        }

        try {
            await register(username.trim(), password);
            showSuccessToast('Success', 'Account created! Please login.');
            navigation.navigate(ROUTES.LOGIN);
        } catch (error) {
            showErrorToast('Registration Failed', error.message);
        }
    };

    return (
        <SafeAreaView style={authStyles.container}>
            <View style={authStyles.formContainer}>
                <View style={authStyles.headerArea}>
                    <Text style={authStyles.title}>Create Account</Text>
                </View>

                <View style={authStyles.inputWrapper}>
                    <Text style={authStyles.inputLabel}>Username</Text>
                    <TextInput
                        style={[authStyles.input, errors.username && authStyles.inputError]}
                        placeholder="Enter username"
                        value={username}
                        onChangeText={(t) => { setUsername(t); setErrors({...errors, username: ''}) }}
                        autoCapitalize="none"
                    />
                    {errors.username && <Text style={authStyles.errorText}>{errors.username}</Text>}
                </View>

                <View style={authStyles.inputWrapper}>
                    <Text style={authStyles.inputLabel}>Password</Text>
                    <TextInput
                        style={[authStyles.input, errors.password && authStyles.inputError]}
                        placeholder="Min 6 characters"
                        secureTextEntry
                        value={password}
                        onChangeText={(t) => { setPassword(t); setErrors({...errors, password: ''}) }}
                        autoCapitalize="none"
                    />
                    {errors.password && <Text style={authStyles.errorText}>{errors.password}</Text>}
                </View>

                <TouchableOpacity style={authStyles.button} onPress={handleRegister} disabled={loading}>
                    {loading ? <LoadingIndicator size="small" color={COLORS.white} /> : <Text style={authStyles.buttonText}>Get Started</Text>}
                </TouchableOpacity>

                <TouchableOpacity style={authStyles.switchContainer} onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                    <Text style={authStyles.switchTextNormal}>Already have an account? <Text style={authStyles.switchTextBold}>Sign In</Text></Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}