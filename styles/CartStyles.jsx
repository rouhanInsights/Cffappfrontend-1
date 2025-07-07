import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2, // Shadow effect for better UX
  },
  cartImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    fontSize: 18,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    color: '#333',
  },
  qtyText: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#333',
  },
  totalSection: {
    padding: 16,
    backgroundColor: '#f8f8f8',
    marginTop: 16,
    borderRadius: 8,
  },
  checkoutBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  suggestionList: {
    paddingHorizontal: 8,
  },
  suggestionCard: {
    width: 200,
    marginRight: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 12,
    elevation: 4,  // Shadow for card-like feel
  },
  suggestionImage: {
    width:180,
    height: 160,
    borderRadius: 8,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#333',
  },
  suggestionPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
  },
  addToCartText: {
    color: '#fff',
    marginLeft: 8,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySubtext: {
    fontSize: 16,
    color: '#888',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  totalText:{
     fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333'
  }
});

export default styles;
