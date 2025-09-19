import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Collapsed bar
  bar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 12,
    marginTop: 8,
  },
  barText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#222",
    fontWeight: "500",
  },

  // Dropdown card
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginHorizontal: 12,
    marginTop: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },

  // Auto-detect button
  detectBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#16a34a",
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: "#f0fdf4",
  },
  detectText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#166534",
  },

  // Manual PIN input row
  manualRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  manualInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "#fafafa",
  },
  checkBtn: {
    marginLeft: 8,
    backgroundColor: "#16a34a",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  checkBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default styles;
