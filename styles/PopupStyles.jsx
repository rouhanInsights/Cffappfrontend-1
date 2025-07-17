import { StyleSheet, Platform } from 'react-native';

const popupStyles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'android' ? 0 : 10, // as close to bottom as safely possible
    left: 10,
    right: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    zIndex: 999,
  },
  popupText: {
    fontSize: 15,
    color: '#000',
    marginBottom: 6,
    fontWeight: '600',
    textAlign: 'center',
  },
  popupLink: {
    fontSize: 14,
    color: '#81991f',
    fontWeight: '500',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default popupStyles;
