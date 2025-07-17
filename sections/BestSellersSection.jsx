import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { API_BASE_URL } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/HomeStyles';
import { useNavigation } from '@react-navigation/native';

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  const fetchBestSellers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/best-sellers`);
      const data = await res.json();
      if (res.ok) setProducts(data);
      else console.error('Error fetching best sellers:', data.error);
    } catch (err) {
      console.error('Best Sellers Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBestSellers();
  }, []);

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.id] || 0;

    return (
      <View style={styles.horizontalCard}>
        <View style={{ position: 'relative', alignItems: 'center' }}>
          <Image source={{ uri: item.image }} style={styles.horizontalImage} />
          {item.sale_price && (
            <View style={styles.ribbonContainer}>
              <Text style={styles.ribbonText}>SALE</Text>
            </View>
          )}
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
          <Text style={styles.horizontalTitle}>{item.name}</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {item.sale_price ? (
            <>
              <Text style={[styles.horizontalPrice, { textDecorationLine: 'line-through', color: '#999' }]}>
                ₹{item.price}
              </Text>
              <Text style={[styles.horizontalPrice, { color: '#d32f2f', fontWeight: 'bold' }]}>
                ₹{item.sale_price}
              </Text>
            </>
          ) : (
            <Text style={styles.horizontalPrice}>₹{item.price}</Text>
          )}
        </View>

        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item.id)}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.id)}>
              <Ionicons name="add-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={localStyles.wrapper}>
      <Text style={styles.topTitle}>💥 Best Sellers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#81991f" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      )}

    </View>
  );
};

const localStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    paddingBottom: 20, // keep space for cart bar
  },
});

export default BestSellersSection;
