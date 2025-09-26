import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0104",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffffff',
    marginTop: 16,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#aaa',
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#c8102e55",
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#e8bc44',
  },
  orderDate: {
    fontSize: 14,
    color: '#aaa',
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    color: '#e8bc44',
    fontWeight: '600',
  },
  paymentInfo: {
    fontSize: 14,
    marginTop: 2,
    color: '#ddd',
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 4,
  },
  slotInfo: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
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
    color: '#fff',
  },
  itemQty: {
    fontSize: 13,
    color: '#aaa',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#e8bc44',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '500',
     color: "#ccc",
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#e8bc44',
  },
  invoiceButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  invoiceButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  feedbackButton: {
    backgroundColor: '#e8bc44',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#0c0c0cff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  feedbackSubmittedText: {
  marginTop: 10,
  color: "#e8bc44",
  fontWeight: "600",
},

});
