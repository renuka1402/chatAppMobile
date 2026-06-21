import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  text: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
