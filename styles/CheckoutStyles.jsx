import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    padding: 16,
  },

  checkoutWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  // Left Section
  leftColumn: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 16,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  inputHalf: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#fff',
    minHeight: 80,
    textAlignVertical: 'top',
  },

  plainText: {
    fontSize: 14,
    marginBottom: 4,
    color: '#444',
  },

  warningText: {
    color: 'red',
    marginTop: 5,
    fontSize: 13,
  },

  // Right Section
  rightColumn: {
    width: '100%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 3,
  },

  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  paymentOption: {
    padding: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },

  selectedPayment: {
    borderColor: '#006b3d',
    backgroundColor: '#e8f5e9',
  },

  confirmBtn: {
    backgroundColor: '#006b3d',
    padding: 14,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
  },

  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  
  selectBtn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 10,
    marginBottom: 10,
  },
  
  selectBtnActive: {
    borderColor: '##006b3d',
    backgroundColor: '#e8f5e9',
  },
  
  selectBtnText: {
    fontSize: 14,
    color: '#333',
  },
  
  selectBtnTextActive: {
    color: '#006b3d',
    fontWeight: '600',
  },
  
});
