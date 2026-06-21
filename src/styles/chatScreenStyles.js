import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS.primary,
  },
  backBtn: {
    paddingHorizontal: 6,
  },
  usersBtn: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: '400',
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  headerAvatarText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
  },
  headerCenter: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: COLORS.white,
  },
  logoutBtn: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
    opacity: 0.9,
    paddingHorizontal: 8,
  },
  wallpaper: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: 12,
    paddingBottom: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: COLORS.background,
  },
  inputBox: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginRight: 8,
    minHeight: 46,
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  input: {
    fontSize: 15,
    color: COLORS.text,
    maxHeight: 100,
    paddingVertical: 4,
  },
  sendBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: COLORS.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendBtnDisabled: {
    backgroundColor: COLORS.secondaryLight,
    elevation: 0,
    shadowOpacity: 0,
  },
  sendIcon: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 2,
  },

dateHeader: {
    alignSelf: 'center',        
    backgroundColor: '#E1F3FB', 
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,           
    marginVertical: 12,        
   
  
},
dateHeaderText: {
    color: '#526870',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',        
},
});
