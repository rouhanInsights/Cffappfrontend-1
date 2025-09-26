import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Myorders from "../screens/Myorders";
import HomeStack from "./HomeStack";
import LinearGradient from "react-native-linear-gradient";
import { View, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e8bc44ff", // 🔴 active red
        tabBarInactiveTintColor: "#c4c4c4ff", // gray inactive
        tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
        tabBarStyle: {
          height: 65,
          paddingBottom: 6,
          borderTopWidth: 0, // remove flat border
          backgroundColor: "transparent", // gradient replaces solid color
        },
        tabBarBackground: () => (
          <LinearGradient
            colors={["#000000ff", "#370303ff"]} // 🔴 red → black
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        ),
      }}
    >
      {/* Home */}
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

      {/* Categories */}
      <Tab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-list" color={color} size={size} />
          ),
        }}
      />

      {/* My Orders */}
      <Tab.Screen
        name="MyOrders"
        component={Myorders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="shopping-outline"
              color={color}
              size={size}
            />
          ),
          tabBarLabel: "My Orders",
        }}
      />

      {/* Profile / Account */}
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
