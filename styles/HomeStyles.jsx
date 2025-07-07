import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9d3d0',
    paddingHorizontal: 1,
 
  },

  // Header row with cart icon
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Search Bar
  searchInput: {
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#333',
    elevation: 1,
  },

  // Delivery Info Card
  deliveryCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  deliveryText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  addressText: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  distanceText: {
    backgroundColor: '#fff',
    color: '#2E7D32',
    fontWeight: '600',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 12,
  },

  // Promo Card
  promoCard: {
    backgroundColor: '#F1FDF5',
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  promoDiscount: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  promoButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  promoButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  promoImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: 16,
  },

  // Section Title
  topTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  // Horizontal product card
  horizontalList: {
    paddingBottom: 24,
  },
  horizontalCard: {
    width: 160,
    borderRadius: 16,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center',
  },
  horizontalImage: {
    width: 150,
    height: 160,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  
  horizontalTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
    color: '#333',
  },
  horizontalPrice: {
    fontSize: 14,
    textAlign: 'center',
  },
  navbarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navbarWrapper: {
     paddingTop:8,
    paddingBottom: 16,
    paddingHorizontal:8,
    backgroundColor: '#f28b82',
 
    
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
   
  },
  
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '75%',
    backgroundColor: '#fff3f3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#ffd6d6',
  },
  
  addressText: {
    fontSize: 13,
    color: '#555',
    marginLeft: 4,
    maxWidth: 200,
  },
  
  addressHighlight: {
    fontWeight: 'bold',
    color: '#FF4D4D',
  },
  
 
  addToCartButton: {
    backgroundColor: '#2e7d32',
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  
  addToCartText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  
  qtyText: {
    marginHorizontal: 8,
    fontSize: 14,
    fontWeight: 'bold',
  },
  popupContainer: {
    position: 'absolute',
    bottom:90,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding:16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  popupText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  popupLink: {
    color: '#e53935',
    fontSize: 15,
    fontWeight: '600',
  },
    cartContainer: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 12,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4D4D',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ribbonContainer: {
    position: 'absolute',
    top: -4,
    left: -4,
    backgroundColor: '#d32f2f',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    zIndex: 1,
  },
  
  ribbonText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  searchItem: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchResultText: {
    fontSize: 16,
    color: '#222',
  },
  searchResultPrice: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  viewAllCard: {
    width: 120,
    height: 170,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  
  viewAllText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#1c2b31', // or '#81991f' for branding
  },
  
  

});

export default styles;
