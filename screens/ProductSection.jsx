import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/ProductSectionStyles";
import { useNavigation } from "@react-navigation/native";

const ProductSection = ({ title = "All Products", products }) => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  // 🟢 Always stringify ID to avoid mismatch between numbers and strings
  const handleIncrement = (id) => incrementQty(String(id));
  const handleDecrement = (id) => decrementQty(String(id));

  const renderProduct = ({ item }) => {
    const productId = String(item.id); // unify all ID references

    // ✅ Correct stock flag (backend field)
    const isOutOfStock = item.in_stock === false;

    // ✅ Get cart quantity safely
    const quantity = cartItems[productId]?.quantity || 0;

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", {
              product: {
                ...item,
                product_id:String(item.id),
                image_url: item.image,
                product_short_description: item.short_description,
              },
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            {/* Discount Ribbon */}
            {item.sale_price && item.price > item.sale_price && (
              <View style={styles.ribbonContainer}>
                <Text style={styles.ribbonText}>
                  {Math.round(((item.price - item.sale_price) / item.price) * 100)}% OFF
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

        {/* Info */}
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        {item.weight ? (
          <Text style={styles.productWeight}>{item.weight}</Text>
        ) : null}

        {/* Price */}
        <View style={styles.priceRow}>
          {item.sale_price && item.sale_price < item.price ? (
            <>
              <Text style={styles.oldPrice}>₹{item.price}</Text>
              <Text style={styles.salePrice}>₹{item.sale_price}</Text>
            </>
          ) : (
            <Text style={styles.price}>₹{item.price}</Text>
          )}
        </View>

        {/* Cart Actions */}
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
            onPress={() =>
              addToCart({
                id: productId,
                name: item.name,
                price: item.sale_price || item.price,
                image: item.image,
              })
            }
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => handleDecrement(productId)}>
              <Ionicons name="remove-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(productId)}>
              <Ionicons name="add-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.topTitle}>{title}</Text>
      <FlatList
        data={[...products.slice(0, 5), { isViewAll: true }]}
        keyExtractor={(item, index) =>
          item?.isViewAll ? `viewAll-${index}` : (item?.id ?? index).toString()
        }
        renderItem={({ item }) =>
          item.isViewAll ? (
            <TouchableOpacity
              style={styles.viewAllCard}
              onPress={() =>
                navigation.navigate("ViewAllProducts", {
                  title,
                  products,
                })
              }
            >
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons
                name="chevron-forward-circle"
                size={32}
                color="#c8102e"
                style={{ marginTop: 8 }}
              />
            </TouchableOpacity>
          ) : (
            renderProduct({ item })
          )
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
      />
    </View>
  );
};

export default ProductSection;
