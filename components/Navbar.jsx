import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useCart } from "../contexts/CartContext";
import LocationSelector from "../components/LocationSelector";
import LinearGradient from "react-native-linear-gradient";
import styles from "../styles/NavbarStyles";

const NavBar = () => {
  const navigation = useNavigation();
  const { getTotalQuantity } = useCart();

  // store location info (from LocationSelector)
  const [location, setLocation] = useState({
    pin: "",
    area: "",
    locality: "",
    state: "",
  });

  return (
    <LinearGradient
      colors={["#5aa812ff", "#006b3d"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.gradientWrapper}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        {/* Location Section */}
        <View style={styles.locationWrapper}>
          <LocationSelector onLocationChange={setLocation} />

         
        </View>

        {/* Cart Button */}
        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() =>
            navigation.navigate("Home", { screen: "CartScreen" })
          }
        >
          <Ionicons name="cart-outline" size={26} color="#fff" />
          {getTotalQuantity() > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>
                {getTotalQuantity()}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity
        style={styles.searchWrapper}
        onPress={() =>
          navigation.navigate("Home", { screen: "SearchScreen" })
        }
      >
        <Ionicons name="search-outline" size={18} color="#2f2f2fff" />
        <TextInput
          placeholder="Search on Calcutta Fresh Foods"
          placeholderTextColor="#343434ff"
          style={styles.searchInput}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default NavBar;
