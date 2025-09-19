import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#FF4D4D",
    paddingVertical: 6,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },

  // Top row: Location + Cart
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  locationWrapper: {
    flex: 1,
    marginRight: 10,
  },
  cartContainer: {
    position: "relative",
    padding: 6,
  },
  cartBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#16a34a",
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  cartBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  // Search row
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
});

export default styles;
