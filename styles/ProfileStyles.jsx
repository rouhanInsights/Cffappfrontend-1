import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#efefefff", // dark background
    paddingTop: 40,
    paddingHorizontal: 16,
  },

  // Profile Header
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f7f7f7ff",
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
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
    color: "#000000ff",
  },
  userPhone: {
    fontSize: 14,
    color: "#000000ff",
    marginTop: 4,
  },

  // Sections
  section: {
    marginBottom: 20,
    backgroundColor: "#f7f7f7ff",
    borderRadius: 10,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#006B3D",
    marginBottom: 8,
    marginLeft: 12,
  },

  // Profile Item
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  itemText: {
    fontSize: 15,
    color: "#000000ff",
    marginLeft: 10,
  },

  // Logout Highlight
  logout: {
    color: "red",
    fontWeight: "bold",
  },
});
