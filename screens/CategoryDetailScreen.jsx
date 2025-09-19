import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@env';
import {
  View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView
} from 'react-native';
import styles from '../styles/CategoryDetailStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from '../contexts/CartContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavBar from '../components/Navbar';

const BASE_URL = API_BASE_URL;

const ALL_CATEGORIES = [
  'Exclusive Fish & Meat',
  'Fish & Seafood',
  'Mutton',
  'Poultry',
  'Steak & Fillets',
];

export default function CategoryDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();
  const initialCategory = route.params?.category || ALL_CATEGORIES[0];

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const fetchCategoryProducts = async (categoryName) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/category?name=${encodeURIComponent(categoryName)}`);
      const data = await res.json();
      if (res.ok) setProducts(data);
    } catch (err) {
      console.error('Failed to load category products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProducts(selectedCategory);
  }, [selectedCategory]);

  const renderItem = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.card}>
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
        <Text style={styles.price}>
          {item.sale_price ? (
            <>
              <Text style={styles.strike}>₹{item.price}</Text>
              {' '}
              <Text style={styles.sale}>₹{item.sale_price}</Text>
            </>
          ) : (
            <>₹{item.price}</>
          )}
        </Text>

        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => addToCart(item.product_id)}
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
              <Ionicons name="remove-circle-outline" size={24} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
              <Ionicons name="add-circle-outline" size={24} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <View style={styles.container}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
          {ALL_CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.filterButton,
                selectedCategory === cat && { backgroundColor: '#2e7d32' },
              ]}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  selectedCategory === cat && { color: '#fff' },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.heading}>{selectedCategory}</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.product_id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
    </View>
  );
}
