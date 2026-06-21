import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  statusBanner: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    width: '100%',
  },
  connectedBanner: {
    backgroundColor: COLORS.primary,
  },
  connectingBanner: {
    backgroundColor: COLORS.secondary,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.white,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  connectedDot: {
    backgroundColor: COLORS.success || '#4CAF50',
  },
  connectingDot: {
    backgroundColor: COLORS.warning || '#FF9800',
  },
});
