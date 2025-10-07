// styles/AddressStyles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefefff", // light background
    padding: 16,
    paddingTop: 40,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000ff", // golden yellow
    marginBottom: 12,
    textAlign: "center",
  },

  // Address Card
  card: {
    backgroundColor: "#fdfdfdff", // light background
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  addrName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000ff",
    marginBottom: 4,
  },
  addrText: {
    fontSize: 14,
    color: "#3f3f3fff",
    marginBottom: 2,
  },

  addrActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  setDefault: {
    color: "#39c31dff", // green
    fontWeight: "600",
    
  },
  edit: {
    color: "#4470e8ff", // golden
    fontWeight: "600",
  },
  delete: {
    color: "#ff4d4d", // red
    fontWeight: "600",
  },
  defaultTag: {
    marginTop: 6,
    color: "#2bad52ff",
    fontWeight: "bold",
    fontSize: 14,
  },

  // Floating Add Button
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    backgroundColor: "#32bf0fff",
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
    backgroundColor: "rgba(0, 0, 0, 0.24)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#efefefff", // dark modal
    borderRadius: 12,
    padding: 20,
  },

  // Inputs
  input: {
    borderWidth: 1,
    borderColor: "#ebfce2ff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#e3e3e3ff",
    color: "#000000ff",
  },
  optionalInput: {
    borderWidth: 1,
    borderColor: "#ebfce2ff",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#e3e3e3ff",
    color: "#000000ff",

  },

  // Buttons
  saveButton: {
    backgroundColor: "#13a206ff",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#ffffffff",
    fontWeight: "bold",
    fontSize: 15,
  },
  cancelButton: {
    backgroundColor: "#abababff",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#000000ff",
    fontWeight: "bold",
    fontSize: 15,
  },
});
