import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0104", // dark background
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  // Profile Header
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#4a232e",
    borderRadius: 12,
    padding: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  userPhone: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },

  // Sections
  section: {
    marginBottom: 20,
    backgroundColor: "#1a0d11",
    borderRadius: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#4a232e",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#e8bc44",
    marginBottom: 8,
    marginLeft: 12,
  },

  // Profile Item
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2a1a1f",
  },
  itemText: {
    fontSize: 15,
    color: "#fff",
    marginLeft: 10,
  },

  // Logout Highlight
  logout: {
    color: "red",
    fontWeight: "bold",
  },
});
