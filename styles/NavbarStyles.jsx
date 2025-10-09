import { StyleSheet } from "react-native";

export default StyleSheet.create({
  gradientWrapper: {
    paddingTop: 40, // safe area (adjust if needed)
    paddingHorizontal: 16,
    paddingBottom: 12,
    elevation: 6, // shadow for Android
    shadowColor: "#f7eeeeff",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  locationWrapper: {
    flex: 1,
  },
  cartContainer: {
    marginLeft: 12,
  },
  cartBadge: {
    position: "absolute",
    top: -6,
    right: -8,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  cartBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#f80000ff",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3f0f0ff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: "#fff",
  },
  locationTextWrapper: {
  marginLeft: 8,
},
locationArea: {
  color: "#fff",
  fontSize: 14,
  fontWeight: "600",
},
locationPin: {
  color: "#e0e0e0",
  fontSize: 12,
},

});
