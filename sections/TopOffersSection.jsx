import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { API_BASE_URL } from "@env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/TopOffersStyles";
import { useNavigation } from "@react-navigation/native";

const REFRESH_INTERVAL = 60000; // 🔁 refresh every 3 seconds

const TopOffersSection = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();
  const navigation = useNavigation();

  // ✅ Fetch Top Offers
  const fetchTopOffers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/top-offers`);
      const data = await res.json();
      if (res.ok) {
        setOffers(data);
      } else {
        console.error("Error fetching Top Offers:", data.error);
      }
    } catch (err) {
      console.error("Top Offers Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial fetch + periodic refresh every 3s
  useEffect(() => {
    fetchTopOffers();
    const interval = setInterval(fetchTopOffers, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const handleIncrement = (id) => incrementQty(String(id));
  const handleDecrement = (id) => decrementQty(String(id));

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

    const productKey = String(item.id);
  const quantity = cartItems[item.id]?.quantity || 0;

    const isOutOfStock = item.in_stock === false;


    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("ProductDetails", {
              product: {
                ...item,
                product_id: productKey,
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
                <Text style={styles.ribbonText}>
                  {Math.round(
                    ((item.price - item.sale_price) / item.price) * 100
                  )}
                  % OFF
                </Text>
              </View>
            )}
            {isOutOfStock && (
              <View style={styles.outOfStockOverlay}>
                <Text style={styles.outOfStockText}>Out of Stock</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productWeight}>{item.weight}</Text>

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

        {isOutOfStock ? (
          <TouchableOpacity
            style={[styles.addToCartButton, styles.disabledButton]}
            disabled
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.disabledText}>Out of Stock</Text>
          </TouchableOpacity>
        ) : quantity === 0 ? (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() =>
              addToCart({
                id: String(item.id),
                name: item.name,
                price: item.sale_price || item.price,
                image: item.image,
              })
            }
          >
            <Ionicons name="cart-outline" size={18} color="#fff" />
            <Text style={styles.addToCartText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => handleDecrement(productKey)}>
              <Ionicons
                name="remove-circle-outline"
                size={24}
                color="#006B3D"
              />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => handleIncrement(productKey)}>
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
        <ActivityIndicator size="large" color="#10c83e" />
      ) : (
        <FlatList
          data={topFiveWithViewAll}
          renderItem={renderProduct}
          keyExtractor={(item, index) =>
            item?.viewAll
              ? `viewAll-${index}`
              : item?.id?.toString() || `offer-${index}`
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
