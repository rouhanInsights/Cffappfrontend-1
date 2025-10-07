import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "../styles/SearchStyles";
import { API_BASE_URL } from "@env";
import { useCart } from "../contexts/CartContext";

const trendingTags = ["Fish", "Chicken", "Mutton", "Prawns"];

const SearchScreen = () => {
  const navigation = useNavigation();
  const { addToCart, incrementQty, decrementQty, cartItems } = useCart();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query || query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${API_BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (res.ok) {
        setSearchResults(data);
      } else {
        console.error("Search error:", data.error);
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search fetch failed:", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        handleSearch(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  const renderItem = ({ item }) => {
    const quantity = cartItems[item.product_id] || 0;

    return (
      <View style={styles.resultCard}>
        {/* Product Image */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() =>
            navigation.navigate("ProductDetails", { product: item })
          }
        >
          <Image source={{ uri: item.image_url }} style={styles.resultImage} />
        </TouchableOpacity>

        {/* Name + Price */}
        <Text style={styles.itemName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.itemPrice}>
          {item.sale_price ? (
            <>
              <Text style={styles.originalPrice}>₹{item.price} </Text>
              <Text style={styles.salePrice}>₹{item.sale_price}</Text>
            </>
          ) : (
            <>₹{item.price}</>
          )}
        </Text>

        {/* Add to Cart / Qty */}
        {quantity === 0 ? (
          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => addToCart(item.product_id)}
          >
            <Ionicons name="cart-outline" size={18} color="#ffffffff" />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.qtySelector}>
            <TouchableOpacity onPress={() => decrementQty(item.product_id)}>
              <Ionicons
                name="remove-circle-outline"
                size={22}
                color="#006b3d"
              />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity onPress={() => incrementQty(item.product_id)}>
              <Ionicons name="add-circle-outline" size={22} color="#006b3d" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#7a7979ff"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons
              name="close-circle"
              size={22}
              color="#999"
              style={{ marginLeft: 8 }}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Trending */}
      {searchQuery.trim() === "" && (
        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Trending Searches</Text>
          <View style={styles.tagWrapper}>
            {trendingTags.map((tag) => (
              <TouchableOpacity
                key={tag}
                style={styles.tag}
                onPress={() => setSearchQuery(tag)}
              >
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {loading && (
        <ActivityIndicator color="#09b71dff" style={{ marginTop: 10 }} />
      )}

      {/* Results */}
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={renderItem}
        numColumns={2} // grid layout like categories
        contentContainerStyle={styles.resultsGrid}
        ListEmptyComponent={() =>
          !loading &&
          searchQuery.trim() !== "" && (
            <Text style={styles.emptyText}>No products found.</Text>
          )
        }
      />
    </View>
  );
};

export default SearchScreen;
