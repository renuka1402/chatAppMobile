import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function ConnectionStatus({ status }) {
    // Agar status defined nahi hai, toh default connecting maan ke chalenge
    const currentStatus = status || 'connecting';

    if (currentStatus === 'connected') {
        // Connected hone par ek chhota sa top banner ya success ribbon dikha sakte hain (ya hide bhi kar sakte hain)
        // Assignment checklist kehta hai: "A visible indicator shown when the socket is connecting or reconnecting"
        // Toh connect hone par hum user ko tasalli dene ke liye green indicator dikhayenge jo temporary ho ya stable
        return (
            <View style={[styles.statusBanner, styles.connectedBanner]}>
                <View style={[styles.dot, styles.connectedDot]} />
                <Text style={styles.statusText}>online</Text>
            </View>
        );
    }

    // Connecting ya Reconnecting status ke liye Orange banner
    return (
        <View style={[styles.statusBanner, styles.connectingBanner]}>
            <View style={[styles.dot, styles.connectingDot]} />
            <Text style={styles.statusText}>Connecting to server...</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    statusBanner: {
        flexDirection: 'row',
        height: 30,
        alignItems: 'center',
       
        width: '100%',
    },
   
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#f4efef',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    connectedDot: {
        backgroundColor: '#4CAF50', 
    },
    connectingDot: {
        backgroundColor: '#FF9800', 
    },
});