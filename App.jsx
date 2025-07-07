import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import RootNavigator from './navigation/RootNavigator'; // ✅ Correct navigation entry
import MainTabs from './navigation/MainTabs';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
          
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
