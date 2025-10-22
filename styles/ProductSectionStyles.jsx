import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42;

export default StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 20,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1b1b1bff",
    marginLeft: 12,
    marginTop: 8,
    marginBottom: 12,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },

  // Product Card
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fdfdfdff",
    borderRadius: 10,
    marginHorizontal: 6,
    padding: 10,
    shadowColor: "#090b09ff",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  imageWrapper: {
    position: "relative",
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
  },

  // SALE ribbon
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

  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#000000ff",
  },
  productWeight: {
    fontSize: 12,
    color: "#555555ff",
    marginBottom: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#313131ff",
  },
  oldPrice: {
    fontSize: 12,
    color: "#929292ff",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#09b71dff",
  },

  // Cart
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006b3d",
    paddingVertical: 6,
    borderRadius: 6,
    borderColor: "#006b3d",
    borderWidth: 1.5,
  },
  addToCartText: {
    color: "#ffffffff",
    fontSize: 13,
    marginLeft: 4,
    fontWeight: "600",
  },
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    borderRadius: 6,
    borderColor: "#006B3D",
    borderWidth: 1.5,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000ff",
  },

  // View All Card
  viewAllCard: {
    width: CARD_WIDTH,
    height: 200,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0c0c0cff",
  },
   wrapper: {
    flex: 1,
    position: "relative",
    paddingBottom: 20,
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  outOfStockText: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "rgba(200,16,46,0.9)",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  disabledText: {
    color: "#eee",
    marginLeft: 5,
    fontWeight: "600",
  },

});
