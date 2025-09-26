import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#0c0104", // dark base
  },

  profileImageWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#e8bc44",
  },
  imagePickerButton: {
    marginTop: -30,
    marginLeft: 70,
    backgroundColor: "#e8bc44",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffffff",
    marginBottom: 16,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffffff",
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#4a232e",
    borderRadius: 8,
    padding: 12,
    color: "#fff",
    borderWidth: 1,
    borderColor: "#e8bc44",
    marginBottom: 10,
  },
  pickerWrapper: {
    backgroundColor: "#4a232e",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e8bc44",
    marginBottom: 10,
  },
  picker: {
    color: "#fff",
  },

  saveButton: {
    backgroundColor: "#e8bc44",
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
});
