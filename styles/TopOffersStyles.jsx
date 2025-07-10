// ✅ styles/TopOffersStyles.js

import { StyleSheet } from 'react-native';

const TopOffersStyles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 8,
  },
  card: {
    width: 140,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
  },
  details: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 14,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
    fontSize: 12,
  },
  discount: {
    fontSize: 12,
    color: '#d32f2f',
    fontWeight: 'bold',
  },
});

export default TopOffersStyles;
