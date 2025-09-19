import React from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import LocationSelector from "../components/LocationSelector";
import styles from "../styles/NavbarStyles";

const NavBar = () => {
  const navigation = useNavigation();
  const { getTotalQuantity } = useCart();

  return (
    <View style={styles.wrapper}>
      {/* Top Row: Location + Cart */}
      <View style={styles.topRow}>
        {/* Location */}
        <View style={styles.locationWrapper}>
          <LocationSelector
            onLocationChange={(pin, area) => {
              console.log("Selected location:", pin, area);
            }}
          />
        </View>

        {/* Cart */}
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => navigation.navigate("Home", { screen: "CartScreen" })}
        >
          <Ionicons name="cart-outline" size={26} color="#333" />
          {getTotalQuantity() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalQuantity()}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchWrapper}
        onPress={() => navigation.navigate("Home", { screen: "SearchScreen" })}
      >
        <Ionicons name="search-outline" size={18} color="#666" />
        <TextInput
          placeholder="Search on Calcutta Fresh Foods"
          style={styles.searchInput}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;
