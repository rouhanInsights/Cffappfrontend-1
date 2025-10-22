import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "@env";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useCart } from "../contexts/CartContext";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import NavBar from "../components/Navbar";
import styles from "../styles/CartStyles";
import cardStyles from "../styles/TopOffersStyles";

// ✅ shimmer placeholder (no MaskedView dependency)
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";

const BASE_URL = API_BASE_URL;

const CartScreen = () => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all products once
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/products`);
        const data = await res.json();
        if (res.ok) {
          setAllProducts(data);
          setRandomProducts(getRandomProducts(data, 5));
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = (products, number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
  };

  const productList = Object.entries(cartItems)
    .map(([productId, qty]) => {
      const product = allProducts.find(
  (p) => p.product_id?.toString() === productId
);
      if (!product) return null;
      return { ...product, quantity: qty };
    })
    .filter(Boolean);

  const totalAmount = productList.reduce((sum, item) => {
    const price = item.sale_price || item.price;
    return sum + price * item.quantity;
  }, 0);

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image_url }} style={styles.cartImage} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          {item.sale_price ? (
            <>
              <Text
                style={{
                  color: "#888",
                  textDecorationLine: "line-through",
                }}
              >
                ₹{item.price}
              </Text>
              <Text style={{ color: "#09b71dff", fontWeight: "bold" }}>
                ₹{item.sale_price}
              </Text>
            </>
          ) : (
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              ₹{item.price}
            </Text>
          )}
        </View>
        <View style={styles.qtyControl}>
          <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
            <Text style={styles.qtyBtn}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
            <Text style={styles.qtyBtn}>＋</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // ✅ Shimmer placeholder while loading (no MaskedView)
  const renderShimmer = () => (
    <View style={{ margin: 16 }}>
      {[...Array(3)].map((_, idx) => (
        <View
          key={idx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <ShimmerPlaceHolder
            LinearGradient={LinearGradient}
            width={80}
            height={80}
            style={{ borderRadius: 8 }}
            shimmerColors={["#5AA812", "#8BD24A", "#006B3D"]}
          />
          <View style={{ marginLeft: 12 }}>
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              width={180}
              height={16}
              shimmerColors={["#5AA812", "#8BD24A", "#006B3D"]}
              style={{ borderRadius: 4 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              width={120}
              height={16}
              shimmerColors={["#5AA812", "#8BD24A", "#006B3D"]}
              style={{ borderRadius: 4, marginTop: 8 }}
            />
            <ShimmerPlaceHolder
              LinearGradient={LinearGradient}
              width={100}
              height={20}
              shimmerColors={["#5AA812", "#8BD24A", "#006B3D"]}
              style={{ borderRadius: 4, marginTop: 8 }}
            />
          </View>
        </View>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f3f3f3ff" }}>
      <NavBar />

      {/* ✅ Show shimmer or cart only after loading */}
      {loading ? (
        renderShimmer()
      ) : productList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          <Text style={styles.emptySubtext}>
            Add fresh items to start your order!
          </Text>
        </View>
      ) : (
        <FlatList
          data={productList}
          keyExtractor={(item) => item.product_id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
          ListHeaderComponent={<Text style={styles.title}>My Cart</Text>}
          ListFooterComponent={
            <>
              {/* ✅ Total & Checkout */}
              <View style={styles.totalSection}>
                <Text style={styles.totalText}>
                  Total: ₹{totalAmount.toFixed(2)}
                </Text>
                <TouchableOpacity
                  style={styles.checkoutBtn}
                  onPress={() =>
                    navigation.navigate("Home", { screen: "CheckoutScreen" })
                  }
                >
                  <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>

              {/* ✅ You may also like */}
              {randomProducts.length > 0 && (
                <>
                  <Text style={styles.suggestionTitle}>You may also like</Text>
                  <FlatList
                    data={randomProducts}
                    keyExtractor={(item) => item.product_id.toString()}
                    renderItem={({ item }) => {
                      const quantity = cartItems[item.product_id] || 0;
                      return (
                        <TouchableOpacity
                          style={styles.card}
                          onPress={() =>
                            navigation.navigate("ProductDetails", {
                              productId: item.product_id,
                            })
                          }
                        >
                          <View style={styles.imageWrapper}>
                            <Image source={{ uri: item.image_url }} style={styles.productImage} />
                            {item.sale_price && (
                              <View style={styles.ribbonContainer}>
                                <Text style={styles.ribbonText}>
                                  {Math.round(((item.price - item.sale_price) / item.price) * 100)}%
                                  OFF
                                </Text>
                              </View>
                            )}
                          </View>

                          <Text style={styles.productName} numberOfLines={1}>
                            {item.name}
                          </Text>
                          <Text style={styles.productWeight}>{item.weight}</Text>

                          <View style={styles.priceRow}>
                            {item.sale_price ? (
                              <>
                                <Text style={styles.oldPrice}>₹{item.price}</Text>
                                <Text style={styles.salePrice}>₹{item.sale_price}</Text>
                              </>
                            ) : (
                              <Text style={styles.price}>₹{item.price}</Text>
                            )}
                          </View>

                          {quantity === 0 ? (
                            <TouchableOpacity
                              style={styles.addToCartButton}
                              onPress={() => addToCart(item.product_id)}
                            >
                              <Ionicons name="cart-outline" size={18} color="#fff" />
                              <Text style={styles.addToCartText}>Add</Text>
                            </TouchableOpacity>
                          ) : (
                            <View style={styles.qtySelector}>
                              <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
                                <Ionicons name="remove-circle-outline" size={22} color="#006b3d" />
                              </TouchableOpacity>
                              <Text style={styles.qtyText}>{quantity}</Text>
                              <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
                                <Ionicons name="add-circle-outline" size={22} color="#006b3d" />
                              </TouchableOpacity>
                            </View>
                          )}
                        </TouchableOpacity>
                      );
                    }}

                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.suggestionList}
                  />
                </>
              )}
            </>
          }
        />
      )}
    </View>
  );
};

export default CartScreen;
