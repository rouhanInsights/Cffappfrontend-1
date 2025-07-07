import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 12,
    paddingBottom: 80, // leave space for cart popup
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginVertical: 10,
    marginLeft: 6,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 6,
  },
  filterButtonText: {
    fontSize: 14,
    color: '#2e7d32',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 120, // avoid being overlapped by popup
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
     resizeMode: 'contain'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    marginBottom: 8,
  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  sale: {
    color: '#d32f2f',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#2e7d32',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  addButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 12,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  cartPopup: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#2e7d32',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    zIndex: 100,
  },
  cartPopupText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  viewCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default styles;
