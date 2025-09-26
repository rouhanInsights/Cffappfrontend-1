import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: "#0c0104",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    margin: 12,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    marginHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    padding: 12,
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
  qtyControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBtn: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e8bc44",
    marginHorizontal: 8,
  },
  qtyText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },

  // Empty State
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0c0104",
  },
  emptyText: {
    fontSize: 18,
    color: "#fff",
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
    backgroundColor: "#111",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  totalText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 10,
  },
  checkoutBtn: {
    backgroundColor: "#e8bc44",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },

  // Suggestions
  suggestionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginHorizontal: 12,
    marginTop: 20,
    marginBottom: 10,
  },
  suggestionList: {
    paddingHorizontal: 10,
  },
});
