import { StyleSheet } from "react-native";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "100%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    marginTop: 10,
    fontWeight: "500",
  },
  starRow: {
    flexDirection: "row",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginTop: 4,
    textAlignVertical: "top",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  submitBtn: {
    backgroundColor: "#8BAD2B",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  cancelBtn: {
    backgroundColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelText: {
    color: "#333",
  },
});
