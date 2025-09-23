// ✅ styles/TopOffersStyles.js

import { StyleSheet } from 'react-native';

const BestSellersStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 8,
  },
  topTitle:{
fontSize: 18,
  fontWeight: '600',
  marginTop: 8,
  textAlign: 'left',
  minHeight: 40,
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
horizontalWeight: {
  fontSize: 14,       
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
});

export default BestSellersStyles;