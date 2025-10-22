import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#080808ff",
    marginBottom: 12,
    textAlign: "center",
  },
  grid: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fdfdfdff",
    borderRadius: 12,
    padding: 10,
    margin: 6,
    width: CARD_WIDTH,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
    color: "#000000ff",
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    gap: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: "#676666ff",
    textDecorationLine: "line-through",
  },
  salePrice: {
    fontSize: 14,
    color: "#09b71dff",
    fontWeight: "bold",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006b3d",
    paddingVertical: 6,
    borderRadius: 6,
  },
  addBtnText: {
    color: "#fbfbfbff",
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
  },
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
