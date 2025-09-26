import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.42; // about 2 cards per screen

export default StyleSheet.create({
  container: {
    marginTop: 25,
    marginBottom: 20,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dddbdbff",
    marginLeft: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  horizontalList: {
    paddingHorizontal: 10,
  },

  // Product Card
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#4a232eff", // dark red/blackish background
    borderRadius: 10,
    marginHorizontal: 6,
    padding: 10,
    shadowColor: "#572626ff",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
    color: "#fff",
    fontWeight: "bold",
  },

  productName: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#fff",
  },
  productWeight: {
    fontSize: 12,
    color: "#dbdbdbff",
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
    color: "#fff",
  },
  oldPrice: {
    fontSize: 12,
    color: "#b8baadff",
    textDecorationLine: "line-through",
    marginRight: 6,
  },
  salePrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },

  // Cart
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8bc44ff",
    paddingVertical: 6,
    borderRadius: 6,
    borderColor: "#e8bc44ff",
    borderWidth: 1.5,
  },
  addToCartText: {
    color: "#0b0000ff",
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
    borderColor: "#e8bc44ff",
    borderWidth: 1.5,
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },

  // View All Card
  viewAllCard: {
    width: CARD_WIDTH,
    height: 200,
    backgroundColor: "#4a232eff",
    borderRadius: 10,
    marginHorizontal: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffffff",
  },
});
