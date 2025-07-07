import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardSize = (width - 48) / 2;

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9d3d0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#222',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    height:1000
  },
  card: {
    width: cardSize,
    height: cardSize * 1.1,
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: '#f9d3d0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 6,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
