import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useCart } from "../contexts/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/ProductDetailsStyles";
import cardStyles from "../styles/TopOffersStyles";
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "@env";

const BASE_URL = API_BASE_URL;

const ProductDetails = ({ route }) => {
  const { product: initialProduct, productId } = route.params;
  const [product, setProduct] = useState(initialProduct || null);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();
  const navigation = useNavigation();

  // ✅ Quantity helper
  const getQuantity = (id) => {
    const item = cartItems[id?.toString()];
    if (!item) return 0;
    return typeof item === "object" ? item.quantity || 0 : item;
  };

  const quantity = product ? getQuantity(product.id) : 0;

  const getTotalItems = () =>
    Object.values(cartItems).reduce((sum, item) => {
      if (typeof item === "number") return sum + item;
      return sum + (item.quantity ?? 0);
    }, 0);

  // ✅ Add full product object to cart
  const handleAddToCart = (item) => {
    addToCart({
      id: item.id || item.product_id,
      name: item.name,
      price: item.sale_price || item.price,
      image: item.image_url,
      weight: item.weight,
    });
  };

  // ✅ Fetch single product (if not passed via route)
  const fetchProductById = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`);
      const data = await res.json();
      if (res.ok) setProduct(data);
    } catch (err) {
      console.error("❌ Product fetch error:", err);
    }
  };

  // ✅ Fetch random “You may also like” items
  const fetchRandomProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/products`);
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const limited = shuffled.slice(0, 6);
        setRandomProducts(limited);
      }
    } catch (err) {
      console.error("❌ Random products fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!initialProduct && productId) fetchProductById();
  }, [productId]);

  useEffect(() => {
    fetchRandomProducts();
  }, []);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#006b3d" />
        <Text>Loading product...</Text>
      </View>
    );
  }

  const isOutOfStock = product.in_stock === false;
  const totalItems = getTotalItems();

  return (
    <View style={{ flex: 1, backgroundColor: "#0c0104" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Image */}
        <View style={{ position: "relative" }}>
          <Image source={{ uri: product.image_url }} style={styles.image} />
          {isOutOfStock && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  backgroundColor: "rgba(200,16,46,0.9)",
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  borderRadius: 8,
                  fontWeight: "bold",
                }}
              >
                Out of Stock
              </Text>
            </View>
          )}
        </View>

        {/* Product Details */}
        <View style={styles.detailCard}>
          <Text style={styles.title}>{product.name}</Text>

          <View style={styles.priceContainer}>
            {product.sale_price ? (
              <>
                <Text style={[styles.price, styles.originalPrice]}>
                  ₹{product.price}
                </Text>
                <Text style={[styles.price, styles.salePrice]}>
                  ₹{product.sale_price}
                </Text>
              </>
            ) : (
              <Text style={styles.price}>₹{product.price}</Text>
            )}
          </View>

          <Text style={styles.description}>
            {product.product_short_description}
          </Text>
          <Text style={styles.description}>
            {product.description ||
              "Delicious and freshly sourced item to make your meals delightful."}
          </Text>

          {/* Badges */}
          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Hygienic</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Farm Fresh</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Ready to Cook</Text>
            </View>
          </View>

          {/* Cart Actions */}
          <View style={styles.cartActionContainer}>
            {isOutOfStock ? (
              <TouchableOpacity
                style={[styles.addBtn, { backgroundColor: "#ccc" }]}
                disabled
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={[styles.addBtnText, { color: "#eee" }]}>
                  Out of Stock
                </Text>
              </TouchableOpacity>
            ) : quantity === 0 ? (
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => handleAddToCart(product)}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.addBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtySelector}>
                <TouchableOpacity
                  onPress={() => decrementQty(product.id.toString())}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={26}
                    color="#006b3d"
                  />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => incrementQty(product.id.toString())}
                >
                  <Ionicons
                    name="add-circle-outline"
                    size={26}
                    color="#006b3d"
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* You May Also Like */}
          {loading ? (
            <Text style={{ textAlign: "center", color: "#888", marginTop: 16 }}>
              Loading suggestions...
            </Text>
          ) : randomProducts.length > 0 ? (
            <>
              <Text style={styles.sectionTitle}>You may also like</Text>
              <FlatList
                data={randomProducts}
                keyExtractor={(item, index) =>
                  item.product_id?.toString() || item.id?.toString() || `p-${index}`
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 12 }}
                renderItem={({ item }) => {
                  const relatedQty = getQuantity(item.id || item.product_id);
                  const relatedOut = item.in_stock === false;

                  return (
                    <View style={cardStyles.card}>
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() =>
                          navigation.navigate("ProductDetails", {
                            product: item,
                            productId: item.product_id||item.id ,
                          })
                        }
                      >
                        <View style={{ position: "relative" }}>
                          <Image
                            source={{ uri: item.image }}
                            style={cardStyles.productImage}
                          />
                          {item.sale_price && (
                            <View style={cardStyles.ribbonContainer}>
                              <Text style={styles.ribbonText}>
                                {Math.round(
                                  ((item.price - item.sale_price) /
                                    item.price) *
                                    100
                                )}
                                % OFF
                              </Text>
                            </View>
                          )}
                          {relatedOut && (
                            <View
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: "rgba(0,0,0,0.4)",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 8,
                              }}
                            >
                              <Text
                                style={{
                                  color: "#fff",
                                  backgroundColor: "rgba(200,16,46,0.9)",
                                  paddingVertical: 4,
                                  paddingHorizontal: 10,
                                  borderRadius: 6,
                                  fontSize: 12,
                                  fontWeight: "bold",
                                }}
                              >
                                Out of Stock
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>

                      <Text style={cardStyles.productName} numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text style={cardStyles.productWeight}>{item.weight}</Text>

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
                          <Text style={cardStyles.price}>₹{item.price}</Text>
                        )}
                      </View>

                      {relatedOut ? (
                        <TouchableOpacity
                          style={[
                            cardStyles.addToCartButton,
                            { backgroundColor: "#ccc" },
                          ]}
                          disabled
                        >
                          <Ionicons name="cart-outline" size={18} color="#fff" />
                          <Text style={{ color: "#eee", marginLeft: 4 }}>
                            Out of Stock
                          </Text>
                        </TouchableOpacity>
                      ) : relatedQty === 0 ? (
                        <TouchableOpacity
                          style={cardStyles.addToCartButton}
                          onPress={() => handleAddToCart(item)}
                        >
                          <Ionicons name="cart-outline" size={18} color="#fff" />
                          <Text style={cardStyles.addToCartText}>Add</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={cardStyles.qtySelector}>
                          <TouchableOpacity
                            onPress={() =>
                              decrementQty(item.id || item.product_id)
                            }
                          >
                            <Ionicons
                              name="remove-circle-outline"
                              size={22}
                              color="#006b3d"
                            />
                          </TouchableOpacity>
                          <Text style={cardStyles.qtyText}>{relatedQty}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              incrementQty(item.id || item.product_id)
                            }
                          >
                            <Ionicons
                              name="add-circle-outline"
                              size={22}
                              color="#006b3d"
                            />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  );
                }}
              />
            </>
          ) : null}
        </View>
      </ScrollView>

      {/* Sticky Cart Bar */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <Text style={styles.cartBarText}>
            {totalItems} item{totalItems > 1 ? "s" : ""} in cart
          </Text>
          <TouchableOpacity
            style={styles.cartBarButton}
            onPress={() =>
              navigation.navigate("Home", { screen: "CartScreen" })
            }
          >
            <Text style={styles.cartBarButtonText}>View Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
