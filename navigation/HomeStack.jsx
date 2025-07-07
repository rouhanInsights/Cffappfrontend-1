import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetails from '../screens/ProductDetails'; // <- ADD THIS
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ViewAllProductsScreen from '../screens/ViewAllProductsScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Homemain" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="CategoryDetailScreen" component={CategoryDetailScreen}/>
      <Stack.Screen name="SearchScreen" component={SearchScreen}/>
      <Stack.Screen name="CartScreen" component={CartScreen}/>
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen}/>
      <Stack.Screen name="ViewAllProducts" component={ViewAllProductsScreen} />
    </Stack.Navigator>
  );
}
