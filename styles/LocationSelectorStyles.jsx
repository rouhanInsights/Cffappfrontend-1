import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // collapsed bar
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#ffffffff",
    borderRadius: 8,
  },
  barText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#111",
    fontWeight: "500",
  },

  // modal overlay
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(39, 32, 32, 0.24)",
  },
  modalContent: {
    backgroundColor: "#ffffffff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2f2e2eff",
    marginBottom: 16,
  },

  // detect location button
  detectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#006B3D",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  detectText: {
    marginLeft: 8,
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },

  // manual pin row
  manualRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  manualInput: {
    flex: 1,
    backgroundColor: "#e0e0dfff",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 15,
  },
  checkBtn: {
    backgroundColor: "#006B3D",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  checkBtnText: {
    color: "#ffffffff",
    fontWeight: "600",
    fontSize: 15,
  },

  // close button
  closeBtn: {
    marginTop: 8,
    padding: 12,
    alignItems: "center",
  },
  closeBtnText: {
    color: "#4b4b4bff",
    fontSize: 14,
  },
});

export default styles;
