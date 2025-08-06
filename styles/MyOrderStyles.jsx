import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#888',
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },
  paymentInfo: {
    fontSize: 14,
    marginTop: 2,
    color: '#444',
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  slotInfo: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#222',
  },
  itemQty: {
    fontSize: 13,
    color: '#555',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#8BAD2B',
  },
  invoiceButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  invoiceButtonText: {
    color: '#333',
    fontWeight: '600',
  },
  feedbackButton: {
    backgroundColor: '#8BAD2B',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  feedbackSubmittedText: {
  marginTop: 10,
  color: "#2e7d32",
  fontWeight: "600",
},

});
