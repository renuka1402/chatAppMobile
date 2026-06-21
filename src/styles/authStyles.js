import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.authBackground,
        justifyContent: 'center',
    },
    formContainer: {
        paddingHorizontal: 28,
    },
    headerArea: {
        marginBottom: 35,
        alignItems: 'center',
    },
    logoCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: COLORS.authLogoBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 18,
        borderWidth: 1,
        borderColor: COLORS.authLogoBorder,
    },
    logoEmoji: {
        fontSize: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: COLORS.authTextDark,
        letterSpacing: -0.5,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: COLORS.authTextMuted,
        textAlign: 'center',
    },
    inputWrapper: {
        marginBottom: 18,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.authTextDark,
        marginBottom: 8,
        paddingLeft: 4,
    },
    input: {
        borderWidth: 1.5,
        borderColor: COLORS.authInputBorder,
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 54,
        fontSize: 16,
        color: COLORS.authTextDark,
        backgroundColor: COLORS.surface,
        shadowColor: COLORS.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 2,
        elevation: 1,
    },
    inputError: {
        borderColor: COLORS.authInputErrorBorder,
        backgroundColor: COLORS.authInputErrorBackground,
    },
    errorText: {
        color: COLORS.authInputErrorBorder,
        fontSize: 13,
        fontWeight: '500',
        marginTop: 6,
        paddingLeft: 4,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.28,
        shadowRadius: 10,
        elevation: 4,
    },
    buttonDisabled: {
        backgroundColor: COLORS.secondaryLight,
        shadowOpacity: 0,
        elevation: 0,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.2,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 28,
    },
    switchTextNormal: {
        color: COLORS.authTextMuted,
        fontSize: 14,
    },
    switchTextBold: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '700',
    },
});