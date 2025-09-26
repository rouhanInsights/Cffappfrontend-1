import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import styles from "../styles/CategoriesStyles";
import NavBar from "../components/Navbar"; // ✅ import NavBar

const categories = [
  { name: "Exclusive Fish & Meat", image: require("../images/POmfret.jpg") },
  { name: "Fish & Seafood", image: require("../images/Hilsha.jpg") },
  { name: "Mutton", image: require("../images/Mutton-Keemas.jpg") },
  { name: "Poultry", image: require("../images/Boneless-breasts.jpeg") },
  { name: "Steak & Fillets", image: require("../images/Baked-Fish-Fillets.jpg") },
];

const CategoriesScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#0c0104" }}> 
      {/* ✅ NavBar placed on top */}
      <NavBar />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Shop by Category</Text>

        <View style={styles.grid}>
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("Home", {
                  screen: "CategoryDetailScreen",
                  params: { category: item.name },
                })
              }
            >
              <Image source={item.image} style={styles.image} resizeMode="cover" />
              <View style={styles.overlay}>
                <Text style={styles.categoryText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;
