import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)", // darker overlay
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "#fdfdfdff", // dark modal box
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#006b3d", // gold title
  },
  label: {
    marginTop: 10,
    fontWeight: "500",
    color: "#000000ff", // white labels
  },
  starRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  input: {
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    textAlignVertical: "top",
    color: "#000000ff", // white text
    backgroundColor: "#dadadaff", // black input background
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  submitBtn: {
    backgroundColor: "#006b3d", // green button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: "#bdbdbdff", // dark gray button
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelText: {
    color: "#000000ff", // gold cancel text
    fontWeight: "600",
  },
});
