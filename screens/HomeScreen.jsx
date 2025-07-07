import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/HomeStyles';
import NavBar from '../components/Navbar';

import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TopOffersSection from '../sections/TopOffersSection';
import AllProductsSection from '../sections/AllProductsSection';
import BestSellersSection from '../sections/BestSellersSection';
import PreviouslyBoughtSection from '../sections/PreviouslyBoughtSection';

const BASE_URL = API_BASE_URL; // Ensure you have the correct path to your .env file';

const HeroSection = () => {
   const heroImage = resolveAssetSource(require('../images/hero.asset.jpg')); 
  return(
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
  )
}

const HomeScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [previouslyBought, setPreviouslyBought] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // Fetch all products
      const productRes = await fetch(`${BASE_URL}/api/products`);
      const productData = await productRes.json();
      if (productRes.ok && Array.isArray(productData)) {
        setProducts(productData);
      } else {
        console.warn('⚠️ Invalid product data:', productData);
      }

      // Fetch orders for previously bought items
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

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container}>
        <HeroSection />

        {loading ? (
          <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />
        ) : (
          <>
            <TopOffersSection products={products.slice(6, 20)} />
            <AllProductsSection products={products} />
            <BestSellersSection products={products.slice(20)} />
            {Array.isArray(previouslyBought) && previouslyBought.length > 0 && (
              <PreviouslyBoughtSection products={previouslyBought} />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
