import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
const OrderSuccessScreen = () => {
  const navigation = useNavigation();

  const handleGoToOrders = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyOrders' }],
    });
  };
 const successImage = resolveAssetSource(require('../images/ordersuccess.png'));
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={100} color="#2e7d32" />
      <Text style={styles.title}>Order Placed!</Text>
      <Text style={styles.subtitle}>Your order was placed successfully.</Text>

      <Image
        source={successImage} // Optional success image
        style={styles.image}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.button} onPress={handleGoToOrders}>
        <Text style={styles.buttonText}>Go to My Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#2e7d32',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginTop: 8,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 200,
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
