import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  productList: {
    paddingHorizontal: 8,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    elevation: 5, // Adds shadow effect
    width: 160,// Adjust width for horizontal list
    height:240,
    

  },
  productImage: {
    width: 160,
    height: 140,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
  // Add these to your styles if not already present
addToCartButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#81991f',
  paddingVertical: 6,
  paddingHorizontal: 10,
  borderRadius: 6,
  marginTop: 6,
},
addToCartText: {
  color: '#fff',
  fontWeight: 'bold',
  marginLeft: 6,
},
qtySelector: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 6,
},
qtyText: {
  fontSize: 16,
  fontWeight: 'bold',
  marginHorizontal: 10,
},

});

export default styles;
