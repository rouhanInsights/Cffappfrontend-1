import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import { API_BASE_URL } from "@env";

import styles from "../styles/HomeStyles";
import NavBar from "../components/Navbar";
import TopOffersSection from "../sections/TopOffersSection";
import ProductSection from "./ProductSection";
import BestSellersSection from "../sections/BestSellersSection";
import PreviouslyBoughtSection from "../sections/PreviouslyBoughtSection";
import CartBar from "../components/CartBar";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const BASE_URL = API_BASE_URL;

const HeroSection = () => {
  const heroImage = resolveAssetSource(require("../images/hero.asset.jpg"));
  return (
    <View style={{ margin: 16, borderRadius: 12, overflow: "hidden" }}>
      <ImageBackground
        source={heroImage}
        style={{ width: "100%", height: 150, justifyContent: "flex-end" }}
        resizeMode="cover"
      >
        <View style={{ backgroundColor: "#00000066", padding: 16 }}>
          <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
            Get Fresh Meat & Fish Delivered to Your Door
          </Text>
          <Text style={{ fontSize: 16, marginTop: 6, color: "#eee" }}>
            High quality, hygienic, and always fresh.
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const { cartItems } = useCart();
  const { userToken, userId, authLoaded } = useAuth();

  const [products, setProducts] = useState([]);
  const [previouslyBought, setPreviouslyBought] = useState([]);
  const [loading, setLoading] = useState(true);

  const calculateCartTotal = (cartObj) =>
  Object.values(cartObj).reduce((sum, item) => sum + (item.quantity || 0), 0);


  const fetchData = async () => {
    try {
      // ✅ Fetch all products
      const productRes = await fetch(`${BASE_URL}/api/products`);
      const productData = await productRes.json();

      if (productRes.ok && Array.isArray(productData)) {
        setProducts(productData);
      } else {
        console.warn("⚠️ Invalid product data:", productData);
      }

      // ✅ Fetch previous orders only if logged in
      if (userToken && userId) {
        console.log("✅ Fetching previous orders for user:", userId);
        const userRes = await fetch(`${BASE_URL}/api/orders/user/${userId}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        const userData = await userRes.json();

        if (userRes.ok && Array.isArray(userData)) {
          const allItems = userData.flatMap((order) => order.items || []);
          const uniqueItems = Array.from(
            new Map(
              allItems.map((item) => [
                item.product_id,
                { ...item, id: item.product_id },
              ])
            ).values()
          );
          console.log("🛒 Previously bought count:", uniqueItems.length);
          setPreviouslyBought(uniqueItems);
        } else {
          console.warn("⚠️ Unexpected userData:", userData);
        }
      } else {
        console.log(
          "ℹ️ Skipping previous items fetch — userToken:",
          userToken,
          "userId:",
          userId
        );
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Wait until authLoaded before fetching
  useEffect(() => {
    if (authLoaded) {
      console.log("🚀 Auth loaded — starting data fetch");
      fetchData();
    }
  }, [authLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <HeroSection />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2e7d32"
            style={{ marginTop: 50 }}
          />
        ) : (
          <>
            <BestSellersSection  />
            <ProductSection products={products} />
            <TopOffersSection  />
            {previouslyBought.length > 0 && (
              <PreviouslyBoughtSection products={previouslyBought} />
            )}
          </>
        )}
      </ScrollView>

      {/* ✅ Persistent cart bar */}
      <CartBar itemCount={calculateCartTotal(cartItems)} />
    </View>
  );
};

export default HomeScreen;
