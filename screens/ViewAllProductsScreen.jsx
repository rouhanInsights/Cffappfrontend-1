import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/ViewAllProductsStyles";
import NavBar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import CartBar from "../components/CartBar";
import { API_BASE_URL } from "@env";

const REFRESH_INTERVAL = 100000; // 🔁 refresh every 3 seconds

const ViewAllProductsScreen = ({ route }) => {
  const { products, title } = route.params;
  const navigation = useNavigation();
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();
  const [productList, setProductList] = useState(products || []);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch updated product data periodically
  const fetchUpdatedProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      if (Array.isArray(data)) {
        // Filter only the products shown on this screen (matching by name or id)
        const filtered = data.filter((item) =>
          productList.some(
            (p) =>
              p.product_id === item.id ||
              p.name?.trim().toLowerCase() === item.name?.trim().toLowerCase()
          )
        );
        setProductList(filtered.length ? filtered : data);
      }
    } catch (err) {
      console.error("❌ Error refreshing products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto refresh every 3 seconds
  useEffect(() => {
    const interval = setInterval(fetchUpdatedProducts, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [productList]);

  const renderItem = ({ item }) => {
    const productKey = String(item.id);
    const quantity = cartItems[item.id]?.quantity || 0;

    const isOutOfStock = item.in_stock === false;


    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
             navigation.navigate("ProductDetails", {
              product: {
                ...item,
                product_id: productKey,
                image_url: item.image,
                product_short_description: item.short_description,
                category_id: item.category_id,
              },
            })
          }
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.image} />

            {/* Discount Ribbon */}
            {item.sale_price && (
              <View style={styles.ribbonContainer}>
                <Text style={styles.ribbonText}>
                  {Math.round(
                    ((item.price - item.sale_price) / item.price) * 100
                  )}
                  % OFF
                </Text>
              </View>
            )}

            {/* Out of Stock Overlay */}
            {isOutOfStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Product Name */}
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Price */}
        <View style={styles.priceContainer}>
          {item.sale_price ? (
            <>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
              <Text style={styles.salePrice}>₹{item.sale_price}</Text>
            </>
          ) : (
            <Text style={styles.salePrice}>₹{item.price}</Text>
          )}
        </View>

        {/* Add to Cart / Qty Selector */}
        {isOutOfStock ? (
          <TouchableOpacity
            style={[styles.addBtn, styles.disabledButton]}
            disabled
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.disabledText}>Add</Text>
          </TouchableOpacity>
        ) : quantity === 0 ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() =>
              addToCart({
                id: String(item.id),
                name: item.name,
                price: item.sale_price || item.price,
                image: item.image,
              })
            }

          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.id)}>
              <Ionicons
                name="remove-circle-outline"
                size={22}
                color="#006B3D"
              />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.id)}>
              <Ionicons name="add-circle-outline" size={22} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={{ flex: 1, backgroundColor: "#efefef" }}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>

        {loading && (
          <ActivityIndicator
            size="large"
            color="#10c83e"
            style={{ marginVertical: 10 }}
          />
        )}

        <FlatList
          data={productList.filter((item) => item && item.name)}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item?.product_id?.toString() ||
            item?.id?.toString() ||
            `product-${index}`
          }
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <CartBar itemCount={calculateCartTotal(cartItems)} />
    </View>
  );
};

export default ViewAllProductsScreen;
