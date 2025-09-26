import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    margin: 0,
    paddingBottom: 80, // space for cart bar
    backgroundColor: "#0c0104",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  detailCard: {
    backgroundColor: "#000000",
    borderRadius: 12,
    margin: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 6,
    lineHeight: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  price: { fontSize: 16, fontWeight: "bold", marginRight: 10 },
  originalPrice: { color: "#999", textDecorationLine: "line-through" },
  salePrice: { color: "#e8bc44", fontWeight: "bold", fontSize: 18 },

  badgeContainer: { flexDirection: "row", marginVertical: 10 },
  badge: {
    backgroundColor: "#c8102e",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  cartActionContainer: { marginTop: 15, alignItems: "center" },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8bc44",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  addBtnText: { color: "#000", marginLeft: 6, fontSize: 14, fontWeight: "600" },
  qtySelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderColor: "#e8bc44ff",
    borderWidth: 1.5,
  },
  qtyText: { color: "#fff", marginHorizontal: 12, fontSize: 16, fontWeight: "600" },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20,
    marginBottom: 10,
  },

  // ✅ Sticky Cart Bar
  cartBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#111",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  cartBarText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  cartBarButton: {
    backgroundColor: "#e8bc44",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cartBarButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});
