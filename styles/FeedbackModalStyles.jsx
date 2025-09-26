import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)", // darker overlay
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "#1a1a1a", // dark modal box
    borderRadius: 10,
    padding: 20,
    width: "100%",
    borderWidth: 1,
    borderColor: "#c8102e55", // subtle red border
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#e8bc44", // gold title
  },
  label: {
    marginTop: 10,
    fontWeight: "500",
    color: "#fff", // white labels
  },
  starRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444", // darker border
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    textAlignVertical: "top",
    color: "#fff", // white text
    backgroundColor: "#000", // black input background
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  submitBtn: {
    backgroundColor: "#c8102e", // red button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: "#333", // dark gray button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelText: {
    color: "#e8bc44", // gold cancel text
    fontWeight: "600",
  },
});
