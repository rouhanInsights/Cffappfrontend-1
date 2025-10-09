import { StyleSheet,Dimensions } from "react-native";
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42; // about 2 cards per screen

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: "#efefefff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#070707ff",
    margin: 12,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdfdfdff",
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000000ff",
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#006b3d",
    marginHorizontal: 8,
  },
  qtyText: {
    fontSize: 14,
    color: "#000000ff",
    fontWeight: "600",
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffffff",
  },
  emptyText: {
    fontSize: 18,
    color: "#000000ff",
    fontWeight: "600",
  },
  emptySubtext: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 6,
  },

  // Total & Checkout
  totalSection: {
    padding: 16,
    backgroundColor: "#fdfdfdff",
    borderTopWidth: 1,
    borderTopColor: "#eeededff",
    marginTop: 6,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000ff",
    marginBottom: 10,
  },
  checkoutBtn: {
    backgroundColor: "#006b3d",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 15,
  },

  // Suggestions
  suggestionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000ff",
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  suggestionList: {
    paddingHorizontal: 10,
  },
  
  suggestionList: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: CARD_WIDTH,
    marginRight: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  ribbonContainer: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#ff3333",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    marginTop: 6,
  },
  productWeight: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 6,
  },
  price: {
    color: "#000",
    fontWeight: "bold",
  },
  oldPrice: {
    color: "#888",
    textDecorationLine: "line-through",
    fontSize: 12,
  },
  salePrice: {
    color: "#09b71d",
    fontWeight: "bold",
  },
  addToCartButton: {
    marginTop: 8,
    backgroundColor: "#006b3d",
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    gap: 4,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  qtySelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    paddingHorizontal: 8,
  },
});
