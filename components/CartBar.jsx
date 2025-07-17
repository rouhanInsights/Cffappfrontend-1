import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CartBar = ({ itemCount }) => {
  const navigation = useNavigation();

  if (itemCount === 0) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate('Home', { screen: 'CartScreen' })}
        activeOpacity={0.8}
      >
        <Ionicons name="cart" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.text}>View Cart</Text>
        <Text style={styles.count}>{itemCount} ITEM{itemCount > 1 ? 'S' : ''}</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 10,
    right: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  cartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  count: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
    marginLeft: 10,
  },
});

export default CartBar;
