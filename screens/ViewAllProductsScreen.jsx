import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from "../styles/ViewAllProductsStyles"
import NavBar from '../components/Navbar';
const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 20;

const ViewAllProductsScreen = ({ route }) => {
  const { products, title } = route.params;
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('ProductDetails', { product: item })}
      >
        <Image source={{ uri: item.image_url }} style={styles.image} />
        <Text style={styles.name} numberOfLines={2}>
          {item.name}
        </Text>
        <View style={styles.priceContainer}>
          {item.sale_price ? (
            <>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
              <Text style={styles.salePrice}>₹{item.sale_price}</Text>
            </>
          ) : (
            <Text style={styles.salePrice}>₹{item.price}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.product_id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </View>
  );
};

export default ViewAllProductsScreen;
