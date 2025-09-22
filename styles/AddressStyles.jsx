import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#006b3d',
    marginBottom: 12,
    textAlign: 'center',
  },

  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
    elevation: 2,
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 15,
  },

  optionalInput: {
    backgroundColor: '#fcfcfc',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    fontSize: 15,
    fontStyle: 'italic',
  },

  saveButton: {
    backgroundColor: '#006b3d',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },

  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },

  addrName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },

  addrDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },

  addrActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },

  setDefault: {
    color: '#006b3d',
    fontWeight: '600',
    fontSize: 14,
  },

  delete: {
    color: '#d32f2f',
    fontWeight: '600',
    fontSize: 14,
  },

  defaultTag: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#2e7d32',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },

  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    backgroundColor: '#006b3d',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.4)',
  justifyContent: 'flex-end',
},
modalContent: {
  backgroundColor: '#fff',
  padding: 20,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  maxHeight: '90%',
},
edit: {
  color: '#0066cc',
  fontWeight: '600',
  marginLeft: 16,
},

});

export default styles;