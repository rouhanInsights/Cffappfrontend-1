import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0104", // dark theme
  },

  checkoutWrapper: {
    flexDirection: "column",
    padding: 12,
  },

  leftColumn: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  rightColumn: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: 10,
  },

  // Address & Slot buttons
  selectBtn: {
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    marginRight: 10,
    backgroundColor: "#111",
  },
  selectBtnActive: {
    borderColor: "#e8bc44",
    backgroundColor: "#1a1a1a",
  },
  selectBtnText: {
    color: "#ddd",
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
    borderBottomColor: "#222",
  },
  cartText: {
    color: "#ffffffff", // light gray for readability
    fontSize: 14,
  },
  cartTextBold: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // Payment options
  paymentOption: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    marginVertical: 6,
    backgroundColor: "#111",
  },
  selectedPayment: {
    borderColor: "#e8bc44",
    backgroundColor: "#1a1a1a",
  },
  paymentText: {
    color: "#fff", // white font for payment methods
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
    backgroundColor: "#e8bc44",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
  },
  confirmText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
});
