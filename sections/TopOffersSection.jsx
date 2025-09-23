// ✅ components/TopOffersSection.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,ActivityIndicator
} from 'react-native';
import { API_BASE_URL } from '@env';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/TopOffersStyles';
import { useNavigation } from '@react-navigation/native';

const TopOffersSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [slideAnim] = useState(new Animated.Value(100));

  const fetchTopOffers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/top-offers`);
      const data = await res.json();
      if (res.ok) setOffers(data);
      else console.error('Error fetching top offers:', data.error);
    } catch (err) {
      console.error('Top Offers Fetch Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopOffers();
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

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  const handleIncrement = (id) => {
    incrementQty(id);
    setTimeout(() => {
      const total = calculateCartTotal(cartItems) + 1;
      triggerPopup(`${total} item${total > 1 ? 's' : ''} in cart`);
    }, 100);
  };

  const handleDecrement = (id) => {
    decrementQty(id);
    setTimeout(() => {
      const total = Math.max(calculateCartTotal(cartItems) - 1, 0);
      triggerPopup(`${total} item${total !== 1 ? 's' : ''} in cart`);
    }, 100);
  };

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.id] || 0;

    return (
      <View style={styles.horizontalCard}>
  <View>
    <Image source={{ uri: item.image }} style={styles.horizontalImage} />
    {item.sale_price && (
      <View style={styles.ribbonContainer}>
        <Text style={styles.ribbonText}>SALE</Text>
      </View>
    )}
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
        <Text style={[styles.horizontalWeight, { color: '#999', marginLeft: 20 }]}>
  {item.weight}
</Text>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
      {item.sale_price ? (
        <>
          <Text style={[styles.horizontalPrice, { textDecorationLine: 'line-through', color: '#999', marginRight: 4 }]}>
            ₹{item.price}
          </Text>
          <Text style={[styles.horizontalPrice, { color: '#d32f2f' }]}>₹{item.sale_price}</Text>
        </>
      ) : (
        <Text style={styles.horizontalPrice}>₹{item.price}</Text>
      )}
    </View>
  </View>

  {quantity === 0 ? (
    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={() => {
        addToCart(item.id);
        const total = calculateCartTotal(cartItems) + 1;
        triggerPopup(`${total} item${total > 1 ? 's' : ''} in cart`);
      }}
    >
      <Ionicons name="cart-outline" size={20} color="#fff" />
      <Text style={styles.addToCartText}>Add to Cart</Text>
    </TouchableOpacity>
  ) : (
    <View style={styles.qtySelector}>
      <TouchableOpacity onPress={() => handleDecrement(item.id)}>
        <Ionicons name="remove-circle-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.qtyText}>{quantity}</Text>
      <TouchableOpacity onPress={() => handleIncrement(item.id)}>
        <Ionicons name="add-circle-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  )}
</View>

    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Top Offers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#81991f" />
      ) : (
        <FlatList
          data={offers}
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

export default TopOffersSection;
