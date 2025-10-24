import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import styles from "../styles/CategoriesStyles";
import NavBar from "../components/Navbar";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { API_BASE_URL } from "@env";

const BASE_URL = API_BASE_URL;

// 🖼️ Local image mapping by category name
const categoryImages = {
  "Exclusive Fish & Meat": require("../images/POmfret.jpg"),
  "Fish & Seafood": require("../images/Hilsha.jpg"),
  "Mutton": require("../images/Mutton-Keemas.jpg"),
  "Poultry": require("../images/Boneless-breasts.jpeg"),
  "Steak & Fillets": require("../images/Baked-Fish-Fillets.jpg"),
  // 👇 add more fallback categories if needed
};

const CategoriesScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/categories`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("⚠️ Failed to fetch categories:", data);
      }
    } catch (err) {
      console.error("❌ Categories fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#fdfdfdff" }}>
      <NavBar />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Shop by Category</Text>

        {loading ? (
          <View style={styles.grid}>
            {[...Array(6)].map((_, idx) => (
              <ShimmerPlaceHolder
                key={idx}
                LinearGradient={LinearGradient}
                style={{
                  width: "45%",
                  height: 160,
                  borderRadius: 12,
                  margin: 8,
                }}
                shimmerColors={["#5AA812", "#8BD24A", "#006B3D"]}
              />
            ))}
          </View>
        ) : categories.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <Text style={{ color: "#666", fontSize: 16 }}>
              No categories available
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {categories.map((cat) => {
              // 🖼️ Pick image from mapping or fallback
              const imageSource =
                cat.image_url
                  ? { uri: cat.image_url }
                  : categoryImages[cat.category_name] ||
                    require("../images/POmfret.jpg");

              return (
                <TouchableOpacity
                  key={cat.category_id}
                  style={styles.card}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate("Home", {
                      screen: "CategoryDetailScreen",
                      params: { category: cat },
                    })
                  }
                >
                  <Image
                    source={imageSource}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <View style={styles.overlay}>
                    <Text style={styles.categoryText}>
                      {cat.category_name}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CategoriesScreen;
