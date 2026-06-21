import React from 'react';
import { Text, View } from 'react-native';
import styles from '../styles/connectionStatusStyles';

export function ConnectionStatus({ status }) {
    const currentStatus = status || 'connecting';

    if (currentStatus === 'connected') {
        return (
            <View style={[styles.statusBanner, styles.connectedBanner]}>
                <View style={[styles.dot, styles.connectedDot]} />
                <Text style={styles.statusText}>online</Text>
            </View>
        );
    }

   
}