import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffeeff',
    paddingHorizontal: 6,
 
  },

  // Header row with cart icon
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 1,
    marginTop: 4,
  },

  headerTitle: {
    marginTop: 4,
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
    alignItems: 'center',
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
  backgroundColor: '#fff',
  borderRadius: 10,
  marginRight: 12,
  width: 160,             // Match compact card
  padding:0,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
  height:320,
},

 horizontalImage: {
  width: 160,
  height: 180,
  borderRadius: 8,
  resizeMode: 'cover', // ensures good crop
},


horizontalTitle: {
  fontSize: 14,
  fontWeight: '600',
  marginTop: 8,
  textAlign: 'center',
  minHeight: 40, // 👈 fixes height for 2 lines
},
horizontalPrice: {
  fontSize: 14,
  fontWeight: 'bold',
  
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
  horizontalWeight: {
  fontSize: 14,  
  textAlign: 'center'     
  },
 
 addToCartButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#006b3d',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 4,
  marginTop: 6,
  alignSelf: 'center',
  height: 36, // 👈 consistent height
},
  
  addToCartText: {
  color: '#fff',
  fontWeight: '600',
  marginLeft: 6,
},

qtySelector: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 100,
  alignSelf: 'center',
  marginTop: 6,
},

qtyText: {
  fontSize: 16,
  fontWeight: '600',
  marginHorizontal: 10,
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
  sectionSpacing: {
    marginBottom: 20},
  

});

export default styles;