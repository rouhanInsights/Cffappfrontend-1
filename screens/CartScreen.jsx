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
import cardStyles from "../styles/TopOffersStyles"; // ✅ reuse product card styles

const BASE_URL = API_BASE_URL;

const CartScreen = () => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();
  const [allProducts, setAllProducts] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);

  // Fetch all products once
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
      }
    };

    fetchProducts();
  }, []);

  const getRandomProducts = (products, number) => {
    const shuffled = products.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, number);
  };

  const productList = Object.entries(cartItems)
    .map(([productId, qty]) => {
      const product = allProducts.find(
        (p) => p.product_id === parseInt(productId)
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
              <Text
                style={{ color: "#e8bc44", fontWeight: "bold" }}
              >
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

  return (
    <View style={{ flex: 1, backgroundColor: "#0c0104" }}>
      <NavBar />

      {productList.length === 0 ? (
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
                    navigation.navigate("Home", {
                      screen: "CheckoutScreen",
                    })
                  }
                >
                  <Text style={styles.checkoutText}>
                    Proceed to Checkout
                  </Text>
                </TouchableOpacity>
              </View>

              {/* ✅ You may also like */}
              {randomProducts.length > 0 && (
                <>
                  <Text style={styles.suggestionTitle}>
                    You may also like
                  </Text>
                  <FlatList
                    data={randomProducts}
                    keyExtractor={(item) =>
                      item.product_id.toString()
                    }
                    renderItem={({ item }) => {
                      const quantity = cartItems[item.product_id] || 0;
                      return (
                        <View style={cardStyles.card}>
                          <View style={cardStyles.imageWrapper}>
                            <Image
                              source={{ uri: item.image_url }}
                              style={cardStyles.productImage}
                            />
                            {item.sale_price && (
                              <View style={cardStyles.ribbonContainer}>
                                <Text style={cardStyles.ribbonText}>
                                  SALE
                                </Text>
                              </View>
                            )}
                          </View>
                          <Text
                            style={cardStyles.productName}
                            numberOfLines={1}
                          >
                            {item.name}
                          </Text>
                          <Text style={cardStyles.productWeight}>
                            {item.weight}
                          </Text>
                          <View style={cardStyles.priceRow}>
                            {item.sale_price ? (
                              <>
                                <Text style={cardStyles.oldPrice}>
                                  ₹{item.price}
                                </Text>
                                <Text style={cardStyles.salePrice}>
                                  ₹{item.sale_price}
                                </Text>
                              </>
                            ) : (
                              <Text style={cardStyles.price}>
                                ₹{item.price}
                              </Text>
                            )}
                          </View>
                          {quantity === 0 ? (
                            <TouchableOpacity
                              style={cardStyles.addToCartButton}
                              onPress={() => addToCart(item.product_id)}
                            >
                              <Ionicons
                                name="cart-outline"
                                size={18}
                                color="#000"
                              />
                              <Text style={cardStyles.addToCartText}>
                                Add
                              </Text>
                            </TouchableOpacity>
                          ) : (
                            <View style={cardStyles.qtySelector}>
                              <TouchableOpacity
                                onPress={() =>
                                  decrementQty(item.product_id)
                                }
                              >
                                <Ionicons
                                  name="remove-circle-outline"
                                  size={22}
                                  color="#e8bc44"
                                />
                              </TouchableOpacity>
                              <Text style={cardStyles.qtyText}>
                                {quantity}
                              </Text>
                              <TouchableOpacity
                                onPress={() =>
                                  incrementQty(item.product_id)
                                }
                              >
                                <Ionicons
                                  name="add-circle-outline"
                                  size={22}
                                  color="#e8bc44"
                                />
                              </TouchableOpacity>
                            </View>
                          )}
                        </View>
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
