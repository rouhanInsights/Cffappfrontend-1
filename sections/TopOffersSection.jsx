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
import styles from '../styles/TopOffersStyles';
import { useNavigation } from '@react-navigation/native';

const TopOffersSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  const fetchTopOffers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/top-offers`);
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
    fetchTopOffers();
  }, []);

  const renderProduct = ({ item }) => {
    const quantity = cartItems[item.product_id || item.id] || 0;

    return (
      <View style={styles.horizontalCard}>
        <View style={{ position: 'relative', alignItems: 'center' }}>
          <Image
            source={{ uri: item.image || item.image_url }}
            style={styles.horizontalImage}
          />
          {item.sale_price && (
            <View style={styles.ribbonContainer}>
              <Text style={styles.ribbonText}>SALE</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductDetails', {
              productId: item.product_id || item.id,
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
                  {
                    textDecorationLine: 'line-through',
                    color: '#999',
                    marginRight: 4,
                  },
                ]}
              >
                ₹{item.price}
              </Text>
              <Text
                style={[
                  styles.horizontalPrice,
                  {
                    color: '#d32f2f',
                    fontWeight: 'bold',
                  },
                ]}
              >
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
            onPress={() => addToCart(item.product_id || item.id)}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />
            <Text style={styles.addToCartText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.product_id || item.id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.product_id || item.id)}>
              <Ionicons name="add-circle-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={localStyles.wrapper}>
      <Text style={styles.topTitle}>💥 Top Offers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#81991f" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) =>
            (item.product_id || item.id).toString()
          }
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
    paddingBottom: 20,
  },
});

export default TopOffersSection;
