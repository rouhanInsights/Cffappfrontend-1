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
    color: "#ffffffff",
    marginBottom: 12,
    textAlign: "center",
  },
  grid: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#4a232e",
    borderRadius: 12,
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
    color: "#aaa",
    textDecorationLine: "line-through",
  },
  salePrice: {
    fontSize: 14,
    color: "#e8bc44",
    fontWeight: "bold",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8bc44",
    paddingVertical: 6,
    borderRadius: 6,
  },
  addBtnText: {
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
  },
  qtyText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
