import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import CategoryDetailScreen from '../screens/CategoryDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ProductDetails from '../screens/ProductDetails';
import MyAddressScreen from '../screens/MyAddressScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailScreen}  // add the screen here
        options={{ title: 'Category Detail' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}  // add the screen here
        options={{ title: 'Cart' }}
      />
       <Stack.Screen name="Checkout" component={CheckoutScreen} />
       <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ title: 'Edit Profile' }} />
       <Stack.Screen name="ProductDetails" component={ProductDetails} />
       <Stack.Screen name="MyAddress" component={MyAddressScreen} />
       <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
       <Stack.Screen name="Search" component={SearchScreen} />
 


    </Stack.Navigator>
  );
}
