import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefefff",
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000ff',
    marginTop: 16,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#595959ff',
  },
  card: {
    backgroundColor: '#fdfdfdff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#10c85a55",
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  orderId: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#006b3d',
  },
  orderDate: {
    fontSize: 14,
    color: '#aaa',
  },
  status: {
    marginTop: 4,
    fontSize: 14,
    color: '#006b3d',
    fontWeight: '600',
  },
  paymentInfo: {
    fontSize: 14,
    marginTop: 2,
    color: '#333',
  },
  deliveryInfo: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  slotInfo: {
    fontSize: 14,
    color: '#333',
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
    color: '#000000ff',
  },
  itemQty: {
    fontSize: 13,
    color: '#333',
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#006b3d',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '500',
     color: "#333",
  },
  totalAmount: {
    fontSize: 15,
    fontWeight: '700',
    color: '#006b3d',
  },
  invoiceButton: {
    backgroundColor: '#d3d3d3ff',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  invoiceButtonText: {
    color: '#2c2c2cff',
    fontWeight: '600',
  },
  feedbackButton: {
    backgroundColor: '#006b3d',
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: '#ffffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  feedbackSubmittedText: {
  marginTop: 10,
  color: "#006b3d",
  fontWeight: "600",
},

});
