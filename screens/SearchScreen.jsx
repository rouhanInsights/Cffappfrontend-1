import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
   ActivityIndicator,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../styles/SearchStyles';
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
const trendingTags = ['Fish', 'Chicken', 'Mutton',  'Prawns'];

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = API_BASE_URL;

  const handleSearch = async (query) => {
    if (!query || query.trim() === '') {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/api/products/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (res.ok) {
        setSearchResults(data);
      } else {
        console.error('Search error:', data.error);
        setSearchResults([]);
      }
    } catch (err) {
      console.error('Search fetch failed:', err);
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

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={22} color="#999" style={{ marginLeft: 8 }} />
          </TouchableOpacity>
        )}
      </View>

      {searchQuery.trim() === '' && (
        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>Trending Searches</Text>
          <View style={styles.tagWrapper}>
            {trendingTags.map((tag) => (
              <TouchableOpacity key={tag} style={styles.tag} onPress={() => setSearchQuery(tag)}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {loading && <ActivityIndicator color="#2e7d32" style={{ marginTop: 10 }} />}

      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => navigation.navigate('ProductDetails', { product: item })}
          >
            <Image source={{ uri: item.image_url }} style={styles.resultImage} />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>₹{item.sale_price || item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          !loading && searchQuery.trim() !== '' && (
            <Text style={styles.emptyText}>Fetching Products .</Text>
          )
        )}
      />
    </View>
  );
};

export default SearchScreen;