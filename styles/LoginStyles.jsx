import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 20,
    position: 'relative',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#589c60ff',
    shadowOpacity: 0.01,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
  },
  loginTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#006b3d',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
    backgroundColor: '#eefdedff',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#006b3d',
  },
  resendButton: {
    marginTop: 10,
    alignSelf: 'center',
  },
});
