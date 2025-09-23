import { StyleSheet,Dimensions } from "react-native";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1c2b31',
  },
  grid: {
    paddingBottom: 20,
  },
  card: {
    width: CARD_WIDTH,
    margin: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 6,
    marginVertical: 6,
    color: '#1c2b31',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  originalPrice: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: '#999',
  },
  salePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#81991f',
  },
});
export default styles;