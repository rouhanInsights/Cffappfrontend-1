import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/PreviouslyBought';

const PreviouslyBoughtSection = ({ products }) => {
   const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => console.log(`Navigating to Product ${item.name}`)} // Handle navigation to product details here
    >
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <View style={styles.productInfo}>
       <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { product: item })}>
                    <Text style={styles.productName}>{item.name}</Text>
                </TouchableOpacity>
        <Text style={styles.productPrice}>₹{item.sale_price || item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Previously Bought</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.product_id.toString()}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

export default PreviouslyBoughtSection;
