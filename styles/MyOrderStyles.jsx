import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#2e7d32',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#777',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderId: {
    fontWeight: '600',
    color: '#333',
  },
  orderDate: {
    fontSize: 13,
    color: '#666',
  },
  status: {
    color: '#2e7d32',
    fontWeight: '600',
    marginTop: 6,
  },
  paymentInfo: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  deliveryInfo: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  slotInfo: {
    fontSize: 13,
    color: '#444',
    marginTop: 2,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginVertical: 10,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },
  itemQty: {
    fontSize: 13,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    color: '#e53935',
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2e7d32',
  },
  loadMoreButton: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    minWidth: 120,
  },
  loadMoreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  }
  
});

export default styles;