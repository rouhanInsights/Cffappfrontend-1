import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefef", // light theme
  },

  checkoutWrapper: {
    flexDirection: "column",
    padding: 12,
  },

  leftColumn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  rightColumn: {
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000ff",
    marginVertical: 10,
  },

  // Address & Slot buttons
  selectBtn: {
    borderWidth: 1,
    borderColor: "#aeaeaeff",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    marginRight: 10,
    backgroundColor: "#fefefeff",
  },
  selectBtnActive: {
    borderColor: "#006b3d",
    borderWidth: 2,
    backgroundColor: "#eaffedff",
  },
  selectBtnText: {
    color: "#1f1f1fff",
    fontSize: 14,
  },

  buttonGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },

  // Order summary items
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#dbdbdbff",
  },
  cartText: {
    color: "#000000ff", // light gray for readability
    fontSize: 14,
  },
  cartTextBold: {
    color: "#000000ff",
    fontWeight: "700",
    fontSize: 14,
  },

  // Payment options
  paymentOption: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: "#e2e2e2ff",
  },
  selectedPayment: {
    borderColor: "#006b3d",
    borderWidth: 2,
    backgroundColor: "#eaffedff",
  },
  paymentText: {
    color: "#000000ff", // white font for payment methods
    fontSize: 14,
  },

  // Warning
  warningText: {
    color: "#d32f2f",
    fontWeight: "600",
    marginTop: 6,
  },

  // Confirm button
  confirmBtn: {
    backgroundColor: "#006b3d",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  confirmText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
