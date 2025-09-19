import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";
import { requestMultiple, PERMISSIONS, RESULTS } from "react-native-permissions";
import Ionicons from "react-native-vector-icons/Ionicons";
import { API_BASE_URL, GOOGLE_MAPS_API_KEY } from "@env";
import styles from "../styles/LocationSelectorStyles"; // ✅ separate styles file

const LocationSelector = ({ onLocationChange }) => {
  const [expanded, setExpanded] = useState(false);
  const [locationLabel, setLocationLabel] = useState("Location not set");
  const [manualPincode, setManualPincode] = useState("");

  const toggleDropdown = () => setExpanded((prev) => !prev);

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
          },
          (error) => {
            Alert.alert("Location Error", error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("Permission Required", "Enable location permissions first.");
      }
    } catch (err) {
      Alert.alert("Error", "Unable to request location permission.");
    }
  };

  const reverseGeocodeAndCheck = async (lat, lng) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}&result_type=postal_code|locality&language=en-IN`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.status !== "OK" || !data.results?.length) {
        Alert.alert("Error", "Could not fetch address.");
        return;
      }

      let postal = "";
      let locality = "";

      for (const r of data.results) {
        const comps = r.address_components || [];
        if (!postal)
          postal =
            comps.find((c) => c.types.includes("postal_code"))?.long_name || "";
        if (!locality)
          locality =
            comps.find((c) => c.types.includes("locality"))?.long_name || "";
      }

      const nice = `${locality || "Current Area"}${postal ? ` • ${postal}` : ""}`;
      setLocationLabel(nice);

      if (postal) {
        await validatePincode(postal);
      }
    } catch {
      Alert.alert("Error", "Unable to fetch address details.");
    }
  };

  const validatePincode = async (pin) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/location/validate/${pin}`);
      const data = await res.json();

      if (res.ok && typeof data?.is_serviceable !== "undefined") {
        if (data.is_serviceable) {
          setLocationLabel(`${data.area_name || "Area"} • ${pin}`);
          if (onLocationChange) onLocationChange(pin, data.area_name);
        } else {
          setLocationLabel(`❌ Not deliverable • ${pin}`);
        }
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
  };

  return (
    <View>
      {/* Collapsed bar */}
      <TouchableOpacity style={styles.bar} onPress={toggleDropdown}>
        <Ionicons name="location-outline" size={18} color="green" />
        <Text style={styles.barText}>{locationLabel}</Text>
        <Ionicons
          name={expanded ? "chevron-up" : "chevron-down"}
          size={16}
          color="#333"
        />
      </TouchableOpacity>

      {/* Expanded dropdown */}
      {expanded && (
        <View style={styles.dropdown}>
          {/* Auto detect */}
          <TouchableOpacity
            style={styles.detectBtn}
            onPress={requestLocationPermission}
          >
            <Ionicons name="locate" size={16} color="#000" />
            <Text style={styles.detectText}>Auto-detect my location</Text>
          </TouchableOpacity>

          {/* Manual pin input */}
          <View style={styles.manualRow}>
            <TextInput
              placeholder="Enter 6-digit PIN"
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
        </View>
      )}
    </View>
  );
};

export default LocationSelector;
