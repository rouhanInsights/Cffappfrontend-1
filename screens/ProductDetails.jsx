import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useCart } from "../contexts/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/ProductDetailsStyles";
import cardStyles from "../styles/TopOffersStyles"; // reuse TopOffers style for related items
import { useNavigation } from "@react-navigation/native";
import { API_BASE_URL } from "@env";

const BASE_URL = API_BASE_URL;

const ProductDetails = ({ route }) => {
  const { product: initialProduct, productId } = route.params;
  const [product, setProduct] = useState(initialProduct || null);
  const [relatedItems, setRelatedItems] = useState([]);
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();
  const navigation = useNavigation();

  const quantity = product ? cartItems[product.product_id?.toString()] || 0 : 0;

  const getTotalItems = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  const handleAddToCart = (productId) => addToCart(productId.toString());

  const fetchProductById = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${productId}`);
      const data = await res.json();
      if (res.ok) setProduct(data);
      else console.warn("Product fetch failed:", data);
    } catch (err) {
      console.error("Product fetch error:", err);
    }
  };

  const fetchRelatedItems = async (categoryId, excludeId) => {
    try {
      const res = await fetch(
        `${API_BASE_URL}/api/products/related/${categoryId}/${excludeId}`
      );
      const data = await res.json();
      if (res.ok) setRelatedItems(data);
    } catch (err) {
      console.error("Failed to fetch related items:", err);
    }
  };

  useEffect(() => {
    if (!initialProduct && productId) fetchProductById();
  }, [productId]);

  useEffect(() => {
    if (product?.category_id && product?.product_id) {
      fetchRelatedItems(product.category_id, product.product_id);
    }
  }, [product]);

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  // ✅ Normalize stock availability check
  const isOutOfStock =
    product.product_stock_available === false ||
    product.product_stock_available === 0 ||
    product.product_stock_available === "false" ||
    product.product_stock_available === null ||
    product.product_stock_available === undefined;

  const totalItems = getTotalItems();

  return (
    <View style={{ flex: 1, backgroundColor: "#0c0104" }}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Product Image with overlay */}
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

        {/* Main Detail Card */}
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

          {/* Add/Qty */}
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
                onPress={() => handleAddToCart(product.product_id)}
              >
                <Ionicons name="cart-outline" size={20} color="#fff" />
                <Text style={styles.addBtnText}>Add to Cart</Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.qtySelector}>
                <TouchableOpacity
                  onPress={() => decrementQty(product.product_id.toString())}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={26}
                    color="#006b3d"
                  />
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => incrementQty(product.product_id.toString())}
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

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Related Items</Text>
              <FlatList
                data={
                  relatedItems.length > 6
                    ? [...relatedItems.slice(0, 6), { viewAll: true }]
                    : relatedItems
                }
                keyExtractor={(item, index) =>
                  item.viewAll ? `viewall-${index}` : item.product_id.toString()
                }
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 12 }}
                renderItem={({ item }) => {
                  if (item.viewAll) {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("RelatedItemsScreen", {
                            categoryId: product.category_id,
                          })
                        }
                        style={cardStyles.viewAllCard}
                      >
                        <Text style={cardStyles.viewAllText}>View All</Text>
                      </TouchableOpacity>
                    );
                  }

                  const relatedKey = item.product_id.toString();
                  const relatedQty = cartItems[relatedKey] || 0;
                  const relatedOut =
                    item.product_stock_available === false ||
                    item.product_stock_available === 0 ||
                    item.product_stock_available === "false" ||
                    item.product_stock_available === null ||
                    item.product_stock_available === undefined;

                  return (
                    <View style={cardStyles.card}>
                      <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={() =>
                          navigation.navigate("ProductDetails", {
                            productId: item.product_id,
                          })
                        }
                      >
                        <View style={{ position: "relative" }}>
                          <Image
                            source={{ uri: item.image_url }}
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

                      <Text
                        style={cardStyles.productName}
                        numberOfLines={1}
                      >
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
                          style={[cardStyles.addToCartButton, { backgroundColor: "#ccc" }]}
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
                          onPress={() => handleAddToCart(relatedKey)}
                        >
                          <Ionicons name="cart-outline" size={18} color="#fff" />
                          <Text style={cardStyles.addToCartText}>Add</Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={cardStyles.qtySelector}>
                          <TouchableOpacity onPress={() => decrementQty(relatedKey)}>
                            <Ionicons
                              name="remove-circle-outline"
                              size={22}
                              color="#006b3d"
                            />
                          </TouchableOpacity>
                          <Text style={cardStyles.qtyText}>{relatedQty}</Text>
                          <TouchableOpacity onPress={() => incrementQty(relatedKey)}>
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
          )}
        </View>
      </ScrollView>

      {/* ✅ Sticky Cart Bar */}
      {totalItems > 0 && (
        <View style={styles.cartBar}>
          <Text style={styles.cartBarText}>
            {totalItems} item{totalItems > 1 ? "s" : ""} in cart
          </Text>
          <TouchableOpacity
            style={styles.cartBarButton}
            onPress={() =>
              navigation.navigate("Home", {
                screen: "CartScreen",
              })
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
