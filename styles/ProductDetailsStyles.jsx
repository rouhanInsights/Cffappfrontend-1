import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: 'cover',
  },
  detailCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  price: {
    fontSize: 20,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  salePrice: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  badgeContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  badge: {
    backgroundColor: '#e0f2f1',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    fontSize: 12,
    color: '#00796b',
    fontWeight: '500',
  },
  cartActionContainer: {
    marginVertical: 14,
    alignItems: 'center',
  },
  addBtn: {
    backgroundColor: '#2e7d32',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '600',
    justifyContent:'center'
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginTop: 24,
    marginBottom: 12,
  },
  relatedCard: {
    backgroundColor: '#fafafa',
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    width: 150,
    elevation: 2,
  },
  viewAllCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewAllText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 14,
  },
  relatedImage: {
    width: '100%',
    height: 90,
    borderRadius: 8,
    marginBottom: 6,
  },
  relatedName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  popupText: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
  },
  popupLink: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
  },
});

export default styles;
