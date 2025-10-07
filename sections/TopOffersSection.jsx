import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import { API_BASE_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/TopOffersStyles";
import { useNavigation } from "@react-navigation/native";

const TopOffersSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [slideAnim] = useState(new Animated.Value(100));

  const fetchTopOffers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/top-offers`);
      const data = await res.json();
      if (res.ok) setOffers(data);
      else console.error("Error fetching Top Offers:", data.error);
    } catch (err) {
      console.error("Top Offers Fetch Error:", err);
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
      triggerPopup(`${total} item${total > 1 ? "s" : ""} in cart`);
    }, 100);
  };

  const handleDecrement = (id) => {
    decrementQty(id);
    setTimeout(() => {
      const total = Math.max(calculateCartTotal(cartItems) - 1, 0);
      triggerPopup(`${total} item${total !== 1 ? "s" : ""} in cart`);
    }, 100);
  };

  const renderProduct = ({ item }) => {
    if (item.viewAll) {
      return (
        <TouchableOpacity
          style={styles.viewAllCard}
          onPress={() =>
            navigation.navigate("ViewAllProducts", {
              title: "Top Offers",
              products: offers.map((p) => ({
                ...p,
                product_id: p.id,
                image_url: p.image,
              })),
            })
          }
        >
          <Text style={styles.viewAllText}>View All</Text>
          <Ionicons
            name="chevron-forward-circle"
            size={32}
            color="#c8102e"
            style={{ marginTop: 8 }}
          />
        </TouchableOpacity>
      );
    }

    const quantity = cartItems[item.id] || 0;

    return (
      <View style={styles.card}>
        {/* Product Image */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", {
              product: {
                ...item,
                product_id: item.id,
                image_url: item.image,
                product_short_description: item.short_description,
                category_id: item.category_id,
              },
            })
          }
          activeOpacity={0.8}
        >
          <View style={styles.imageWrapper}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            {item.sale_price && (
              <View style={styles.ribbonContainer}>
                <Text style={styles.ribbonText}>{item.discount}% OFF</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        {/* Product Info */}
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productWeight}>{item.weight}</Text>

        {/* Price */}
        <View style={styles.priceRow}>
          {item.sale_price ? (
            <>
              <Text style={styles.oldPrice}>₹{item.price}</Text>
              <Text style={styles.salePrice}>₹{item.sale_price}</Text>
            </>
          ) : (
            <Text style={styles.price}>₹{item.price}</Text>
          )}
        </View>

        {/* Cart Actions */}
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              addToCart(item.id);
              const total = calculateCartTotal(cartItems) + 1;
              triggerPopup(`${total} item${total > 1 ? "s" : ""} in cart`);
            }}
          >
            <Ionicons name="cart-outline" size={20} color="#ffffffff" />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => handleDecrement(item.id)}>
              <Ionicons name="remove-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(item.id)}>
              <Ionicons name="add-circle-outline" size={24} color="#006B3D" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  const topFiveWithViewAll = [...offers.slice(0, 5), { viewAll: true }];

  return (
    <View style={styles.container}>
      <Text style={styles.topTitle}>Top Offers</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#10c83eff" />
      ) : (
        <FlatList
          data={topFiveWithViewAll}
          renderItem={renderProduct}
          keyExtractor={(item, index) =>
            item?.viewAll ? `viewAll-${index}` : item?.id?.toString() || `offer-${index}`
          }
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      )}
    </View>
  );
};

export default TopOffersSection;
