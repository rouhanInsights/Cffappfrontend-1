import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/Navbar';
import styles from '../styles/CartStyles';

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
          setRandomProducts(getRandomProducts(data, 5)); // Get 5 random products
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
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
      const product = allProducts.find(p => p.product_id === parseInt(productId));
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
        <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
          {item.sale_price ? (
            <>
              <Text style={{ color: '#888', textDecorationLine: 'line-through' }}>
                ₹{item.price}
              </Text>
              <Text style={{ color: '#d32f2f', fontWeight: 'bold' }}>
                ₹{item.sale_price}
              </Text>
            </>
          ) : (
            <Text style={{ color: '#333', fontWeight: '600' }}>
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
    <View style={{ flex: 1 }}>
      <NavBar />

      {productList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>🛒 Your cart is empty</Text>
          <Text style={styles.emptySubtext}>Add fresh items to start your order!</Text>
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
              <View style={styles.totalSection}>
                <Text style={styles.totalText}>Total: ₹{totalAmount.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.checkoutBtn}
                  onPress={() => navigation.navigate('Home', {
                    screen: 'CheckoutScreen'
                  })}>
                  <Text style={styles.checkoutText}>Proceed to Checkout</Text>
                </TouchableOpacity>
              </View>

              {randomProducts.length > 0 && (
                <>
                  <Text style={styles.suggestionTitle}>You may also like</Text>
                  <FlatList
                    data={randomProducts}
                    keyExtractor={(item) => item.product_id.toString()}
                    renderItem={({ item }) => (
                      <View style={styles.suggestionCard}>
                        <Image source={{ uri: item.image_url }} style={styles.suggestionImage} />
                        <Text style={styles.suggestionName}>{item.name}</Text>
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
                        <TouchableOpacity
                          style={styles.addToCartButton}
                          onPress={() => addToCart(item.product_id)}>
                          <Ionicons name="cart-outline" size={20} color="#fff" />
                          <Text style={styles.addToCartText}>Add to Cart</Text>
                        </TouchableOpacity>
                      </View>
                    )}
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
