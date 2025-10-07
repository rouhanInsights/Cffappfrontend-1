import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../styles/CategoryDetailStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../contexts/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../components/Navbar";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import CartBar from "../components/CartBar";
const BASE_URL = API_BASE_URL;

const ALL_CATEGORIES = [
  "Exclusive Fish & Meat",
  "Fish & Seafood",
  "Mutton",
  "Poultry",
  "Steak & Fillets",
];

export default function CategoryDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();
  const initialCategory = route.params?.category || ALL_CATEGORIES[0];
  const [showCartBar, setShowCartBar] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategoryProducts = async (categoryName) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/category?name=${encodeURIComponent(categoryName)}`
      );
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error("Failed to load category products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts(selectedCategory);
  }, [selectedCategory]);

  const renderItem = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate("ProductDetails", { product: item })}
        >
          <Image source={{ uri: item.image_url }} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ProductDetails", { product: item })}
        >
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
        </TouchableOpacity>

        <View style={styles.priceRow}>
          {item.sale_price ? (
            <>
              <Text style={styles.strike}>₹{item.price}</Text>
              <Text style={styles.sale}>₹{item.sale_price}</Text>
            </>
          ) : (
            <Text style={styles.price}>₹{item.price}</Text>
          )}
        </View>

        {quantity === 0 ? (
  <TouchableOpacity
    style={styles.addButton}
    onPress={() => {
      addToCart(
         item.product_id
        
      );
      setShowCartBar(true); // 👈 show CartBar after adding
    }}
  >
    <Ionicons name="cart-outline" size={18} color="#000" />
    <Text style={styles.addButtonText}>Add to Cart</Text>
  </TouchableOpacity>
) : (
  <View style={styles.qtySelector}>
    <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
      <Ionicons name="remove-circle-outline" size={22} color="#e8bc44" />
    </TouchableOpacity>
    <Text style={styles.qtyText}>{quantity}</Text>
    <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
      <Ionicons name="add-circle-outline" size={22} color="#e8bc44" />
    </TouchableOpacity>
  </View>
)}
      </View>
    );
  };
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#0c0104" }}>
      <NavBar />

      <View style={styles.container}>
        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 12 }}
        >
          {loading
            ? ALL_CATEGORIES.map((_, i) => (
                <ShimmerPlaceHolder
                  key={i}
                  LinearGradient={LinearGradient}
                  style={{
                    width: 110,
                    height: 32,
                    borderRadius: 20,
                    marginRight: 8,
                  }}
                />
              ))
            : ALL_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.filterButton,
                    selectedCategory === cat && styles.filterButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCategory === cat && styles.filterButtonTextActive,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
        </ScrollView>

        <Text style={styles.heading}>{selectedCategory}</Text>

        {loading ? (
          <FlatList
            data={Array(6).fill({})} // 6 shimmer cards
            keyExtractor={(_, index) => `shimmer-${index}`}
            renderItem={() => (
              <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={{
                  width: "50%",
                  height: 200,
                  borderRadius: 10,
                  margin: 10,
                }}
              />
            )}
            numColumns={2}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            numColumns={2} // ✅ grid view for professional look
          />
        )}
      </View>
      <CartBar
  visible={showCartBar}
  itemCount={totalItems}   // ✅ pass item count
  onClose={() => setShowCartBar(false)}
/>


    </View>
  );
}
