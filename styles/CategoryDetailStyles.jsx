import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffffff",
    marginBottom: 12,
    textAlign: "center",
  },

  // Category filters
  filterButton: {
    width: 130,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e8bc44",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    flexShrink: 0,  
    
  },

  filterButtonActive: {
    backgroundColor: "#e8bc44",
    
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 16,
     textAlign: "center",
  },
  filterButtonTextActive: {
    color: "#000",
    fontWeight: "bold",
  },

  // Product cards
  list: {
    paddingBottom: 40,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#4a232e",
    borderRadius: 10,
    padding: 10,
    margin: 6,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 6,
  },
  price: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  strike: {
    fontSize: 12,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  sale: {
    fontSize: 14,
    color: "#e8bc44",
    fontWeight: "bold",
  },

  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8bc44",
    paddingVertical: 8,
    borderRadius: 6,
  },
  addButtonText: {
    color: "#000",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#e8bc44",
    borderWidth: 1.5,
    borderRadius: 6,
    paddingVertical: 4,
    marginTop: 4,
    marginBottom: 6,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
