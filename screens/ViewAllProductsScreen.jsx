import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "../styles/ViewAllProductsStyles";
import NavBar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import Ionicons from "react-native-vector-icons/Ionicons";

const ViewAllProductsScreen = ({ route }) => {
  const { products, title } = route.params;
  const navigation = useNavigation();
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();

  const renderItem = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate("ProductDetails", { product: item })}
        >
          <Image source={{ uri: item.image_url }} style={styles.image} />
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
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(item.product_id)}
          >
            <Ionicons name="cart-outline" size={18} color="#ffffffff" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
              <Ionicons name="remove-circle-outline" size={22} color="#006B3D" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
              <Ionicons name="add-circle-outline" size={22} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#efefefff" }}>
      <NavBar />
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ViewAllProductsScreen;
