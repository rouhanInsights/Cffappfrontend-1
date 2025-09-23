import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  sectionContainer: {
    paddingHorizontal: 1,
    marginTop: 16,
  },
   sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },

  productList: {
    paddingBottom: 10,
  },
  productCard: {
    width: 160,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginRight: 12,
    overflow: 'hidden',
    elevation: 3,
  },

  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
 productInfo: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },

  productName: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },

  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  // Add these to your styles if not already present
addToCartButton: {
    backgroundColor: '#006b3d',
    paddingVertical: 6,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addToCartText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
    fontSize: 13,
  },

  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },

  qtyText: {
    fontSize: 14,
    fontWeight: 'bold',
  },

});

export default styles;