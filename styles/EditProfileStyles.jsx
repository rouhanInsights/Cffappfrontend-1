import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  profileImageWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#81991f',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c2b31',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1c2b31',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#81991f',
    padding: 14,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
  },
  
  picker: {
    height: 50,
    width: '100%',
  },
  imagePickerText:{
    
  }
  
});
