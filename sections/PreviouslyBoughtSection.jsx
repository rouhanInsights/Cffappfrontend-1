import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PreviouslyBought';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';

const PreviouslyBoughtSection = ({ products }) => {
  const navigation = useNavigation();
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();

  const renderItem = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
    <View style={styles.productCard}>
  <Image source={{ uri: item.image_url }} style={styles.productImage} />
  <View style={styles.productInfo}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetails', {
          productId: item.product_id,
        })
      }
    >
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>

    <Text style={styles.productPrice}>₹{item.sale_price || item.price}</Text>

    <View style={{ flex: 1 }} /> {/* pushes button to bottom */}

    {quantity === 0 ? (
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item.product_id)}
      >
        <Ionicons name="cart-outline" size={18} color="#fff" />
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    ) : (
      <View style={styles.qtySelector}>
        <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
          <Ionicons name="remove-circle-outline" size={22} color="#000" />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{quantity}</Text>
        <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
          <Ionicons name="add-circle-outline" size={22} color="#000" />
        </TouchableOpacity>
      </View>
    )}
  </View>
</View>

    );
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Previously Bought</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

export default PreviouslyBoughtSection;
