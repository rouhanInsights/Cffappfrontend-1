import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/PreviouslyBoughtStyles";

const PreviouslyBoughtSection = ({ products = [] }) => {
  const navigation = useNavigation();
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();

  const renderItem = ({ item }) => {
    const productId = item.id?.toString();
    const quantity = cartItems[item.id]?.quantity || 0;

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", { product: item })
          }
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            {item.sale_price && (
              <View style={styles.ribbonContainer}>
                <Text style={styles.ribbonText}>SALE</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Product Info */}
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={styles.productWeight}>{item.weight || "—"}</Text>

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
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(productId)}>
              <Ionicons name="remove-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(productId)}>
              <Ionicons name="add-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Previously Bought</Text>
      <FlatList
        data={products}
        keyExtractor={(item, index) => (item?.id ?? index).toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalList}
        ListEmptyComponent={
          <Text style={{ color: "#666", padding: 10 }}>
            No previously bought products yet.
          </Text>
        }
      />
    </View>
  );
};

export default PreviouslyBoughtSection;
