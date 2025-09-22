import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { API_BASE_URL } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/BestSellersStyles';
import { useNavigation } from '@react-navigation/native';

const BestSellersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart = { items: [] }, addToCart, removeFromCart } = useCart();

  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [slideAnim] = useState(new Animated.Value(100));

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

  const triggerPopup = (message) => {
    setPopupMessage(message);
    setShowPopup(true);

    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowPopup(false);
      });
    }, 2500);
  };

  const calculateCartTotal = (cartItems) =>
    cartItems.reduce((sum, item) => sum + (item.quantity ?? 1), 0);

  const renderProduct = ({ item }) => {
    const quantity =
      cart.items.find((ci) => ci.id.toString() === item.id.toString())
        ?.quantity || 0;

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

        {/* ✅ FIX: Map image → image_url during navigation */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetails', {
              product: {
                ...item,
                product_id: item.id,
                image_url: item.image,
                product_short_description: item.short_description,
                category_id: item.category_id, // ✅ fix the blank image issue
              },
            })
          }
        >
          <Text style={styles.horizontalTitle}>{item.name}</Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.horizontalWeight,
            {
              color: '#999',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 20,
            },
          ]}
        >
          {item.weight}
        </Text>

        {/* Price / Sale Price */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 4,
          }}
        >
          {item.sale_price ? (
            <>
              <Text
                style={[
                  styles.horizontalPrice,
                  { textDecorationLine: 'line-through', color: '#999', marginRight: 4 },
                ]}
              >
                ₹{item.price}
              </Text>
              <Text
                style={[
                  styles.horizontalPrice,
                  { color: '#d32f2f', fontWeight: 'bold' },
                ]}
              >
                ₹{item.sale_price}
              </Text>
            </>
          ) : (
            <Text style={styles.horizontalPrice}>₹{item.price}</Text>
          )}
        </View>

        {/* Cart Actions */}
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart({
                id: item.id.toString(),
                name: item.name,
                price: item.sale_price || item.price,
                image: item.image,
              });
              const total = calculateCartTotal(cart.items) + 1;
              triggerPopup(`${total} item${total > 1 ? 's' : ''} in cart`);
            }}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => removeFromCart(item.id.toString())}>
              <Ionicons name="remove-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                addToCart({
                  id: item.id.toString(),
                  name: item.name,
                  price: item.sale_price || item.price,
                  image: item.image,
                  
                })
              }
            >
              <Ionicons name="add-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Best Sellers</Text>
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

export default BestSellersSection;
