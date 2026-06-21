import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { COLORS } from '../styles/colors';
import styles from '../styles/loadingStyles';

export default function LoadingIndicator({
  size = 'large',
  color = COLORS.primary,
  text = null,
  fullScreen = false,
  style,
}) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen, style]}>
      <ActivityIndicator size={size} color={color} />
      {text ? <Text style={styles.text}>{text}</Text> : null}
    </View>
  );
}
