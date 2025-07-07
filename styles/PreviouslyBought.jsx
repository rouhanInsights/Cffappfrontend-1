import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 100,
  },
  sectionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  productList: {
    paddingHorizontal: 8,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 12,
    elevation: 5, // Adds shadow effect
    width: 160,// Adjust width for horizontal list
    height:210 ,
    

  },
  productImage: {
    width: 160,
    height: 140,
    borderRadius: 8,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default styles;
