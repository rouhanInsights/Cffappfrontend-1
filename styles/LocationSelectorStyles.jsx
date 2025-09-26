import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // collapsed bar
  bar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#111",
    borderRadius: 8,
  },
  barText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },

  // modal overlay
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#1a1a1a",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },

  // detect location button
  detectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#800b11ff",
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
    backgroundColor: "#222",
    color: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    fontSize: 15,
  },
  checkBtn: {
    backgroundColor: "#800b11ff",
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
  },
  checkBtnText: {
    color: "#fff",
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
    color: "#aaa",
    fontSize: 14,
  },
});

export default styles;
