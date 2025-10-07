import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import RootNavigator from './navigation/RootNavigator';

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
