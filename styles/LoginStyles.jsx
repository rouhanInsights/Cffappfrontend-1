
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 600,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  link: {
    marginTop: 10,
    color: '#2e7d32',
    textAlign: 'center',
  },
});

export default styles;
