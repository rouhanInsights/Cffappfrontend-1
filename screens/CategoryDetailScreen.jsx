import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "@env";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
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
const REFRESH_INTERVAL = 3000; // 🔁 refresh every 3 seconds

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
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCartBar, setShowCartBar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [slideAnim] = useState(new Animated.Value(100));

  // ✅ Fetch category products
  const fetchCategoryProducts = async (categoryName) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/category?name=${encodeURIComponent(categoryName)}`
      );
      const data = await res.json();
      if (res.ok) setProducts(data);
      else console.error("Error loading category:", data.error);
    } catch (err) {
      console.error("Failed to load category products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial + auto refresh every 3s
  useEffect(() => {
    fetchCategoryProducts(selectedCategory);
    const interval = setInterval(() => {
      fetchCategoryProducts(selectedCategory);
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [selectedCategory]);

  // ✅ Popup animation for cart changes
  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowPopup(false));
    }, 2500);
  };

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  const handleIncrement = (id) => {
    incrementQty(id);
    setTimeout(() => {
      const total = calculateCartTotal(cartItems) + 1;
      triggerPopup(`${total} item${total > 1 ? "s" : ""} in cart`);
    }, 100);
  };

  const handleDecrement = (id) => {
    decrementQty(id);
    setTimeout(() => {
      const total = Math.max(calculateCartTotal(cartItems) - 1, 0);
      triggerPopup(`${total} item${total !== 1 ? "s" : ""} in cart`);
    }, 100);
  };

  const renderItem = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;
    const isOutOfStock =
      item.product_stock_available === false || item.stock_quantity <= 0;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", {
              product: {
                ...item,
                product_id: item.id,
                image_url: item.image,
                product_short_description: item.short_description,
                category_id: item.category_id,
              },
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            {item.sale_price && (
              <View style={styles.ribbonContainer}>
                <Text style={styles.ribbonText}>
                  {Math.round(((item.price - item.sale_price) / item.price) * 100)}% OFF
                </Text>
              </View>
            )}
            {isOutOfStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>
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

        {isOutOfStock ? (
          <TouchableOpacity
            style={[styles.addToCartButton, styles.disabledButton]}
            disabled
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.disabledText}>Add</Text>
          </TouchableOpacity>
        ) : quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item.product_id)}
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => handleDecrement(item.product_id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.product_id)}>
              <Ionicons name="add-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#efefef" }}>
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
            data={Array(6).fill({})}
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
            numColumns={2}
          />
        )}
      </View>

      {/* ✅ Sticky Cart Bar */}
      <CartBar
        visible={showCartBar}
        itemCount={totalItems}
        onClose={() => setShowCartBar(false)}
      />
    </View>
  );
}
