import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0104", // dark background
    paddingTop: 40,
    padding: 12,
  },

  // 🔍 Search bar
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e8bc44",
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 14,
    paddingVertical: 6,
  },

  // 📌 Trending section
  trendingContainer: {
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e8bc44",
    marginBottom: 8,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#4a232e",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e8bc44",
  },
  tagText: {
    color: "#fff",
    fontSize: 13,
  },

  // 🛒 Search result product card
  resultsGrid: {
    paddingBottom: 40,
  },
  resultCard: {
    width: CARD_WIDTH,
    backgroundColor: "#4a232e",
    borderRadius: 10,
    padding: 10,
    margin: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 6,
  },
  itemPrice: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 12,
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  salePrice: {
    fontSize: 14,
    color: "#e8bc44",
    fontWeight: "bold",
  },

  // Add to Cart button
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8bc44",
    paddingVertical: 8,
    borderRadius: 6,
  },
  addBtnText: {
    color: "#000",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  // Qty selector
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#e8bc44",
    borderWidth: 1.5,
    borderRadius: 6,
    paddingVertical: 4,
    marginTop: 4,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  // Empty state
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
    fontSize: 14,
  },
});
