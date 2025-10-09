import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { requestMultiple, PERMISSIONS, RESULTS } from "react-native-permissions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_BASE_URL, GOOGLE_MAPS_API_KEY } from "@env";
import styles from "../styles/LocationSelectorStyles";

const LocationSelector = ({ onLocationChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locationLabel, setLocationLabel] = useState("Set Delivery Location");
  const [manualPincode, setManualPincode] = useState("");

  const requestLocationPermission = async () => {
    try {
      const statuses = await requestMultiple([
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ]);

      const fine = statuses[PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION];
      const coarse = statuses[PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION];

      if (fine === RESULTS.GRANTED || coarse === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          async (pos) => {
            const { latitude, longitude } = pos.coords;
            await reverseGeocodeAndCheck(latitude, longitude);
            setModalVisible(false);
          },
          (error) => Alert.alert("Location Error", error.message),
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("Permission Required", "Enable location permissions first.");
      }
    } catch {
      Alert.alert("Error", "Unable to request location permission.");
    }
  };

  const reverseGeocodeAndCheck = async (lat, lng) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&result_type=postal_code|locality|sublocality&language=en-IN`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "OK" || !data.results?.length) {
        Alert.alert("Error", "Could not fetch address.");
        return;
      }

      let postal = "";
      let locality = "";
      let area = "";
      let city = "";
      let state = "";

      for (const r of data.results) {
        const comps = r.address_components || [];

        if (!postal)
          postal = comps.find((c) => c.types.includes("postal_code"))?.long_name || "";

        if (!area)
          area =
            comps.find((c) => c.types.includes("sublocality"))?.long_name ||
            comps.find((c) => c.types.includes("neighborhood"))?.long_name ||
            "";

        if (!locality)
          locality =
            comps.find((c) => c.types.includes("locality"))?.long_name ||
            comps.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ||
            "";

        if (!city)
          city =
            comps.find((c) => c.types.includes("administrative_area_level_2"))?.long_name ||
            "";

        if (!state)
          state =
            comps.find((c) => c.types.includes("administrative_area_level_1"))?.long_name ||
            "";
      }

      const locationText =
        area && locality
          ? `${area}, ${locality} – ${postal}`
          : locality
          ? `${locality} – ${postal}`
          : city
          ? `${city} – ${postal}`
          : `Location – ${postal}`;

      setLocationLabel(locationText);

      if (postal) {
        await validatePincode(postal, area, locality, state);
      }
    } catch (error) {
      console.error("Reverse geocode error:", error);
      Alert.alert("Error", "Unable to fetch address details.");
    }
  };

  const validatePincode = async (pin, area, locality, state) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/location/validate/${pin}`);
      const data = await res.json();

      if (res.ok && typeof data?.is_serviceable !== "undefined") {
        const areaName = data.area_name || area || "Area";

        if (data.is_serviceable) {
          const display = `${areaName}, ${locality || state} • ${pin}`;
          setLocationLabel(display);
        } else {
          // 🚫 Show area + locality + pincode but mark as not deliverable
          const display = `${areaName}, ${locality || state} • ${pin} (Not Deliverable)`;
          setLocationLabel(display);
        }

        // always pass data up for Navbar
        if (onLocationChange)
          onLocationChange({ pin, area: areaName, locality, state });
      } else {
        Alert.alert("Validation Error", data?.error || "Failed to validate pincode");
      }
    } catch {
      Alert.alert("Network Error", "Unable to validate pincode.");
    }
  };

  const onManualCheck = async () => {
    if (!/^\d{6}$/.test(manualPincode)) {
      Alert.alert("Invalid Pincode", "Enter a valid 6-digit pincode.");
      return;
    }
    setLocationLabel(`Entered Pincode • ${manualPincode}`);
    await validatePincode(manualPincode);
    setModalVisible(false);
  };

  return (
    <View>
      {/* Collapsed bar */}
      <TouchableOpacity style={styles.bar} onPress={() => setModalVisible(true)}>
        <Ionicons name="location-outline" size={18} color="red" />
        <Text style={styles.barText}>{locationLabel}</Text>
        <Ionicons name="chevron-down" size={16} color="#fff" />
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Delivery Location</Text>

            {/* Auto Detect */}
            <TouchableOpacity style={styles.detectBtn} onPress={requestLocationPermission}>
              <Ionicons name="locate" size={18} color="#fff" />
              <Text style={styles.detectText}>Auto-detect my location</Text>
            </TouchableOpacity>

            {/* Manual Pincode */}
            <View style={styles.manualRow}>
              <TextInput
                placeholder="Enter 6-digit PIN"
                placeholderTextColor="#aaa"
                keyboardType="number-pad"
                maxLength={6}
                value={manualPincode}
                onChangeText={setManualPincode}
                style={styles.manualInput}
              />
              <TouchableOpacity onPress={onManualCheck} style={styles.checkBtn}>
                <Text style={styles.checkBtnText}>Check</Text>
              </TouchableOpacity>
            </View>

            <Pressable onPress={() => setModalVisible(false)} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default LocationSelector;
