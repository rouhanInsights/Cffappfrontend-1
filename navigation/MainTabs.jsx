import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CategoriesScreen from '../screens/CategoriesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Myorders from '../screens/Myorders';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2e7d32',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 5 },
      }}
    >
      <Tab.Screen
         
        name="Home"
        component={HomeStack} 
        options={{
          headerShown: false ,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={size} />
          ),
        }}
      />
      
      <Tab.Screen
        name="MyOrders"
        component={Myorders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
