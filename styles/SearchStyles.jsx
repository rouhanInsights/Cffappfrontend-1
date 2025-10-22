import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.45;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f4f4ff", // dark background
    paddingTop: 40,
    padding: 12,
  },

  // 🔍 Search bar
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffffff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#006B3D",
  },
  searchInput: {
    flex: 1,
    color: "#000000ff",
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
    color: "#006B3D",
    marginBottom: 8,
  },
  tagWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: "#006B3D",
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#006B3D",
  },
  tagText: {
    color: "#ffffffff",
    fontSize: 13,
  },

  // 🛒 Search result product card
  resultsGrid: {
    paddingBottom: 40,
  },
  resultCard: {
    width: CARD_WIDTH,
    backgroundColor: "#fdfdfdff",
    borderRadius: 10,
    padding: 10,
    margin: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
    color: "#000000ff",
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
    color: "#09b71dff",
    fontWeight: "bold",
  },

  // Add to Cart button
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006b3d",
    paddingVertical: 8,
    borderRadius: 6,
  },
  addBtnText: {
    color: "#ffffffff",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  // Qty selector
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#006b3d",
    borderWidth: 1.5,
    borderRadius: 6,
    paddingVertical: 4,
    marginTop: 4,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000ff",
  },

  // Empty state
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    color: "#aaa",
    fontSize: 14,
  },
  ribbonContainer: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "#c8102e",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  ribbonText: {
    fontSize: 10,
    color: "#ffffffff",
    fontWeight: "bold",
  },
    imageWrapper: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  outOfStockText: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(200,16,46,0.9)",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledText: {
    color: "#eee",
    marginLeft: 6,
    fontWeight: "600",
  },

});
