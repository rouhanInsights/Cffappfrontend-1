import { StyleSheet } from "react-native";

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
});
