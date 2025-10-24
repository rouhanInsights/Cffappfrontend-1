import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import { API_BASE_URL } from "@env";
import styles from "../styles/CategoryDetailStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useCart } from "../contexts/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../components/Navbar";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import CartBar from "../components/CartBar";

const BASE_URL = API_BASE_URL;
const REFRESH_INTERVAL = 15000;

export default function CategoryDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();

  const initialCategory = route.params?.category || null; // may be a category object
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [showCartBar, setShowCartBar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [slideAnim] = useState(new Animated.Value(100));

  // Helpers (object- or number-based storage compatible)
  const getQty = (id) => {
    const k = id?.toString();
    const entry = cartItems[k];
    if (!entry) return 0;
    return typeof entry === "object" ? (entry.quantity || 0) : entry;
  };
  const cartTotal = Object.values(cartItems).reduce((sum, v) => {
    if (typeof v === "number") return sum + v;
    return sum + (v.quantity || 0);
  }, 0);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch(`${BASE_URL}/api/categories`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setCategories(data);
        if (!selectedCategory && data.length > 0) setSelectedCategory(data[0]);
      }
    } catch (e) {
      console.error("Failed to load categories:", e);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchCategoryProducts = async (categoryId) => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/products/category?category_id=${categoryId}`
      );
      const data = await res.json();
      // Controller returns { id, name, price, sale_price, image, in_stock, ... }
      // Normalize to what the UI expects
      const normalized = Array.isArray(data)
        ? data.map((p) => ({
            id: p.id ?? p.product_id,
            name: p.name,
            price: p.sale_price ? p.price : p.price,
            sale_price: p.sale_price ?? null,
            image_url: p.image_url ?? p.image,
            weight: p.weight,
            in_stock: p.in_stock,
          }))
        : [];
      setProducts(normalized);
    } catch (e) {
      console.error("Failed to load category products:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory?.category_id) {
      fetchCategoryProducts(selectedCategory.category_id);
      const interval = setInterval(() => {
        fetchCategoryProducts(selectedCategory.category_id);
      }, REFRESH_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [selectedCategory]);

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }).start();
    setTimeout(() => {
      Animated.timing(slideAnim, { toValue: 100, duration: 300, useNativeDriver: true })
        .start(() => setShowPopup(false));
    }, 2500);
  };

  const handleIncrement = (id) => {
    incrementQty(id); // <-- use item.id
    setTimeout(() => triggerPopup(`${cartTotal + 1} item${cartTotal + 1 > 1 ? "s" : ""} in cart`), 100);
  };

  const handleDecrement = (id) => {
    decrementQty(id); // <-- use item.id
    setTimeout(() => {
      const next = Math.max(cartTotal - 1, 0);
      triggerPopup(`${next} item${next !== 1 ? "s" : ""} in cart`);
    }, 100);
  };

  const renderItem = ({ item }) => {
    const quantity = getQty(item.id);            // <-- use item.id
    const isOutOfStock = item.in_stock === false;

    return (
      <View style={styles.card}>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate("ProductDetails", {
              product: item,        // has id, image_url, etc.
              productId: item.id,   // <-- pass id
            })
          }
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

        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productWeight}>{item.weight}</Text>

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
          <TouchableOpacity style={[styles.addToCartButton, styles.disabledButton]} disabled>
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.disabledText}>Add</Text>
          </TouchableOpacity>
        ) : quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() =>
              addToCart({
                id: item.id, // <-- consistent
                name: item.name,
                price: item.sale_price || item.price,
                image: item.image_url,
              })
            }
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.id)}>
              <Ionicons name="add-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const totalItems = cartTotal;

  return (
    <View style={{ flex: 1, backgroundColor: "#efefef" }}>
      <NavBar />
      <View style={styles.container}>
        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 12 }}>
          {loadingCategories
            ? Array(4).fill({}).map((_, i) => (
                <ShimmerPlaceHolder
                  key={i}
                  LinearGradient={LinearGradient}
                  style={{ width: 110, height: 32, borderRadius: 20, marginRight: 8 }}
                />
              ))
            : categories.map((cat) => (
                <TouchableOpacity
                  key={cat.category_id}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.filterButton,
                    selectedCategory?.category_id === cat.category_id && styles.filterButtonActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      selectedCategory?.category_id === cat.category_id && styles.filterButtonTextActive,
                    ]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {cat.category_name}
                  </Text>
                </TouchableOpacity>
              ))}
        </ScrollView>

        <Text style={styles.heading}>
          {selectedCategory?.category_name || "Loading..."}
        </Text>

        {loading ? (
          <FlatList
            data={Array(6).fill({})}
            keyExtractor={(_, index) => `shimmer-${index}`}
            renderItem={() => (
              <ShimmerPlaceHolder
                LinearGradient={LinearGradient}
                style={{ width: "50%", height: 200, borderRadius: 10, margin: 10 }}
              />
            )}
            numColumns={2}
          />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()} // <-- id, not product_id
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            numColumns={2}
          />
        )}
      </View>

      <CartBar visible={showCartBar} itemCount={totalItems} onClose={() => setShowCartBar(false)} />

      {/* Optional popup if you want to use it */}
      {showPopup && (
        <Animated.View
          style={{
            position: "absolute",
            bottom: 90,
            left: 20,
            right: 20,
            transform: [{ translateY: slideAnim }],
            backgroundColor: "#0f8224",
            padding: 12,
            borderRadius: 12,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center", fontWeight: "600" }}>
            {popupMessage}
          </Text>
        </Animated.View>
      )}
    </View>
  );
}
