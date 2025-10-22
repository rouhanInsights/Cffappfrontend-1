import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.44;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 12,
    paddingTop: 8,
  },

  // Heading
  heading: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212121",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: 0.4,
  },

  // Category filters
  filterButton: {
    minWidth: 120,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#006B3D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  filterButtonActive: {
    backgroundColor: "#006B3D",
    borderColor: "#006B3D",
    elevation: 4,
  },
  filterButtonText: {
    color: "#444",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  filterButtonTextActive: {
    color: "#fff",
    fontWeight: "700",
  },

  // Product grid
  list: {
    paddingBottom: 70,
    justifyContent: "space-between",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    margin: 6,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
  },

  imageWrapper: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },

  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    resizeMode: "cover",
  },

  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1A1A1A",
    marginTop: 6,
  },

  productWeight: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },

  // Price Row
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 8,
    gap: 6,
  },
  price: {
    fontSize: 14,
    color: "#1A1A1A",
    fontWeight: "700",
  },
  strike: {
    fontSize: 12,
    color: "#9E9E9E",
    textDecorationLine: "line-through",
  },
  sale: {
    fontSize: 14,
    color: "#00A86B",
    fontWeight: "700",
  },

  // Add to cart button
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006B3D",
    paddingVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  addToCartText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },

  // Disabled button (Out of stock)
  disabledButton: {
    backgroundColor: "#C7C7C7",
  },
  disabledText: {
    color: "#eee",
    marginLeft: 6,
    fontWeight: "600",
  },

  // Quantity Selector
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#006B3D",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 4,
    marginTop: 4,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#212121",
  },

  // Discount Ribbon
  ribbonContainer: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: "#C8102E",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    elevation: 3,
  },
  ribbonText: {
    fontSize: 10,
    color: "#fff",
    fontWeight: "700",
  },

  // Out of Stock Overlay
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
    elevation: 3,
  },
});
