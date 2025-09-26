import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d', // black background
  },
  scrollContainer: {
    flex: 1,
  },
  loader: {
    marginTop: 50,
  },
  // Hero Section
  heroWrapper: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  heroImageContainer: {
    width: '50%',
    height: 200,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  heroTextWrapper: {
    position: 'absolute',
    bottom: 20,
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#e50914', // bold Netflix-like red
  },
  heroSubtitle: {
    fontSize: 16,
    marginTop: 8,
    color: '#f5f5f5',
  },
});
