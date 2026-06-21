import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  bubble: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 4,
    maxWidth: '75%',
  },
  myBubble: {
    backgroundColor: COLORS.chatMyBubble,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: COLORS.chatOtherBubble,
    alignSelf: 'flex-start',
  },
  sender: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.chatSender,
    marginBottom: 2,
  },
  messageText: {
    fontSize: 15,
    color: COLORS.chatMessageText,
  },
  time: {
    fontSize: 9,
    color: COLORS.chatTime,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
});
