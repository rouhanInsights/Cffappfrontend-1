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
import styles from "../styles/ProductSectionStyles"; // ✅ new dedicated styles
import { useNavigation } from "@react-navigation/native";

const ProductSection = ({ title = "All Products", products }) => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  const handleIncrement = (id) => incrementQty(id);
  const handleDecrement = (id) => decrementQty(id);

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", {
              product: item,
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            {item.sale_price && (
              <View style={styles.ribbonContainer}>
                <Text style={styles.ribbonText}>{Math.round(((item.price - item.sale_price) / item.price) * 100)}% OFF</Text>
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
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item.product_id)}
          >
            <Ionicons name="cart-outline" size={18} color="#ffffffff" />
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
    <View style={localStyles.wrapper}>
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

const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
    paddingBottom: 20,
  },
});

export default ProductSection;
