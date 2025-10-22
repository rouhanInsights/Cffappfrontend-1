import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/ProductSectionStyles";
import { useNavigation } from "@react-navigation/native";

const ProductSection = ({ title = "All Products", products }) => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  const handleIncrement = (id) => incrementQty(id);
  const handleDecrement = (id) => decrementQty(id);

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;
    const isOutOfStock = item.product_stock_available === false;

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
         onPress={() =>
            navigation.navigate("ProductDetails", {
              product: {
                ...item,
                product_id: item.product_id,
                image_url: item.image,
                product_short_description: item.short_description,
                category_id: item.category_id,
                product_stock_available: item.product_stock_available,
              },
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />

            {/* Discount Ribbon */}
            {item.sale_price && (
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
        <Text style={styles.productWeight}>{item.weight}</Text>

        {/* Price */}
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

        {/* Cart Actions */}
        {isOutOfStock ? (
          <TouchableOpacity
            style={[styles.addToCartButton, styles.disabledButton]}
            disabled={true}
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

  return (
    <View style={styles.wrapper}>
      <Text style={styles.topTitle}>{title}</Text>
      <FlatList
        data={[...products.slice(0, 5), { isViewAll: true }]}
        keyExtractor={(item, index) =>
          item?.isViewAll
            ? `viewAll-${index}`
            : (item?.product_id ?? index).toString()
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
