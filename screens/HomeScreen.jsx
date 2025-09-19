import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@env';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeStyles';
import NavBar from '../components/Navbar';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TopOffersSection from '../sections/TopOffersSection';
import ProductSection from './ProductSection';
import BestSellersSection from '../sections/BestSellersSection';
import PreviouslyBoughtSection from '../sections/PreviouslyBoughtSection';
import { useCart } from '../contexts/CartContext';
import CartBar from '../components/CartBar'; // ✅ Import global CartBar

const BASE_URL = API_BASE_URL;

const HeroSection = () => {
  const heroImage = resolveAssetSource(require('../images/hero.asset.jpg'));
  return (
    <View style={{ margin: 16, borderRadius: 12, overflow: 'hidden' }}>
      <ImageBackground
        source={heroImage}
        style={{ width: '100%', height: 400, justifyContent: 'flex-end' }}
        resizeMode="cover"
      >
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: '#fff' }}>
            Get Fresh Meat & Fish Delivered to Your Door
          </Text>
          <Text style={{ fontSize: 16, marginTop: 6, color: '#eee' }}>
            High quality, hygienic, and always fresh.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [previouslyBought, setPreviouslyBought] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems } = useCart(); // ✅ access cart globally

  const fetchData = async () => {
    try {
      const productRes = await fetch(`${BASE_URL}/api/products`);
      const productData = await productRes.json();
      if (productRes.ok && Array.isArray(productData)) {
        setProducts(productData);
      } else {
        console.warn('⚠️ Invalid product data:', productData);
      }

      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userRes = await fetch(`${BASE_URL}/api/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userRes.json();
        if (userRes.ok && Array.isArray(userData.orders)) {
          const allItems = userData.orders.flatMap(order => order.items || []);
          const uniqueItems = Array.from(
            new Map(allItems.map(item => [item.product_id, item])).values()
          );
          setPreviouslyBought(uniqueItems);
        } else {
          console.warn('⚠️ Unexpected userData:', userData);
        }
      }
    } catch (err) {
      console.error('❌ Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const calculateCartTotal = (cartObj) =>
    Object.values(cartObj).reduce((sum, qty) => sum + qty, 0);

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <HeroSection />

        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />
        ) : (
          <>
            <TopOffersSection products={products.slice(6, 20)} />
            <ProductSection products={products} />
            <BestSellersSection products={products} />
            {Array.isArray(previouslyBought) && previouslyBought.length > 0 && (
              <PreviouslyBoughtSection products={previouslyBought} />
            )}
          </>
        )}
      </ScrollView>

      {/* ✅ Single persistent cart bar */}
      <CartBar itemCount={calculateCartTotal(cartItems)} />
    </View>
  );
};

export default HomeScreen;
