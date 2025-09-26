// styles/AddressStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // full black background
    padding: 16,
    paddingTop: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffffff", // golden yellow
    marginBottom: 12,
    textAlign: "center",
  },

  // Address Card
  card: {
    backgroundColor: "#4a232e", // maroon card
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  addrName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  addrText: {
    fontSize: 14,
    color: "#ddd",
    marginBottom: 2,
  },

  addrActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  setDefault: {
    color: "#48ec28ff", // green
    fontWeight: "600",
    
  },
  edit: {
    color: "#e8e044ff", // golden
    fontWeight: "600",
  },
  delete: {
    color: "#ff4d4d", // red
    fontWeight: "600",
  },
  defaultTag: {
    marginTop: 6,
    color: "#8BAD2B",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Floating Add Button
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#e8bc44",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#1a1a1a", // dark modal
    borderRadius: 12,
    padding: 20,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: "#e8bc44",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#4a232e",
    color: "#fff",
  },
  optionalInput: {
    borderWidth: 1,
    borderColor: "#e8bc44",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#4a232e",
    color: "#fff",

  },

  // Buttons
  saveButton: {
    backgroundColor: "#e8bc44",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
  cancelButton: {
    backgroundColor: "#555",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
