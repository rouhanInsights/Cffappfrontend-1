import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, PermissionsAndroid, Platform
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/HomeStyles';

const NavBar = () => {
  const navigation = useNavigation();
  const { getTotalQuantity } = useCart();
  const [location, setLocation] = useState();

  const requestLocationPermission = async () => {
    try {
      const permission =
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const result = await request(permission);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            setLocation(`Lat: ${latitude.toFixed(3)}, Lon: ${longitude.toFixed(3)}`);
          },
          (error) => {
            Alert.alert('Location Error', error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert('Permission Denied', 'Location permission is required to fetch delivery address.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.navbarWrapper}>
      {/* Top Row */}
      <View style={styles.navbarContainer}>
        <TouchableOpacity
          style={styles.addressContainer}
          onPress={requestLocationPermission}
          activeOpacity={0.7}
        >
          <Entypo name="location-pin" size={20} color="#FF4D4D" />
          <Text style={styles.addressText} numberOfLines={1}>
            Deliver to: <Text style={styles.addressHighlight}>{location}</Text>
          </Text>
          <Ionicons name="chevron-down" size={18} color="#444" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Home', {
                                screen: 'CartScreen'
                            })}>
          <View style={styles.cartContainer}>
            <Ionicons name="cart-outline" size={26} color="#333" />
            {getTotalQuantity() > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{getTotalQuantity()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TouchableOpacity onPress={() => navigation.navigate('Home', {
        screen: 'SearchScreen',
      })}>
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
