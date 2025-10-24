import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Modal,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "react-native-vector-icons/AntDesign";
import styles from "../styles/AddressStyles";
import { API_BASE_URL } from "@env";

export default function MyAddressScreen() {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    floor_no: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  });

  // ✅ Fetch all addresses
  const fetchAddresses = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const res = await fetch(`${API_BASE_URL}/api/users/addresses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setAddresses(data);
      else Alert.alert("Error", data.error || "Failed to load addresses");
    } catch (err) {
      console.error("Fetch error:", err);
      Alert.alert("Error", "Unable to fetch addresses");
    }
  };

  const resetForm = () => {
    setNewAddress({
      name: "",
      phone: "",
      address_line1: "",
      address_line2: "",
      floor_no: "",
      landmark: "",
      city: "",
      state: "",
      pincode: "",
    });
    setEditingId(null);
    setShowModal(false);
  };

  // ✅ Add or Edit address
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("userToken");
    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${API_BASE_URL}/api/users/addresses/${editingId}`
      : `${API_BASE_URL}/api/users/addresses`;

    const body = {
      ...newAddress,
      is_default: !editingId && addresses.length === 0, // first address default
    };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", editingId ? "Address updated" : "Address added");
        resetForm();
        fetchAddresses();
      } else {
        Alert.alert("Error", data.error || "Operation failed");
      }
    } catch (err) {
      console.error("Save error:", err);
      Alert.alert("Error", "Failed to save address");
    }
  };

  // ✅ Delete address
  const deleteAddress = async (id) => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const res = await fetch(`${API_BASE_URL}/api/users/addresses/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) fetchAddresses();
      else {
        const data = await res.json();
        Alert.alert("Error", data.error || "Failed to delete address");
      }
    } catch (err) {
      console.error("Delete error:", err);
      Alert.alert("Error", "Delete failed");
    }
  };

  // ✅ Set as default
  const setAsDefault = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      const addressToUpdate = addresses.find((a) => a.address_id === id);
      if (!addressToUpdate) return;

      const body = { ...addressToUpdate, is_default: true };

      const res = await fetch(`${API_BASE_URL}/api/users/addresses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        Alert.alert("Success", "Default address updated");
        fetchAddresses();
      } else {
        Alert.alert("Error", data.error || "Failed to update default");
      }
    } catch (err) {
      console.error("Set default error:", err);
      Alert.alert("Error", "Could not set default");
    }
  };

  // ✅ Edit existing address
  const editAddress = (item) => {
    setNewAddress({
      name: item.name,
      phone: item.phone,
      address_line1: item.address_line1,
      address_line2: item.address_line2,
      floor_no: item.floor_no || "",
      landmark: item.landmark || "",
      city: item.city,
      state: item.state,
      pincode: item.pincode,
    });
    setEditingId(item.address_id);
    setShowModal(true);
  };

  const renderAddress = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.addrName}>{item.name}</Text>
      <Text style={styles.addrText}>
        {item.address_line1}, {item.address_line2}
      </Text>
      {item.floor_no ? (
        <Text style={styles.addrText}>Floor: {item.floor_no}</Text>
      ) : null}
      {item.landmark ? (
        <Text style={styles.addrText}>Landmark: {item.landmark}</Text>
      ) : null}
      <Text style={styles.addrText}>
        {item.city}, {item.state}, {item.pincode}
      </Text>
      <Text style={styles.addrText}>Phone: {item.phone}</Text>

      <View style={styles.addrActions}>
        {!item.is_default && (
          <TouchableOpacity onPress={() => setAsDefault(item.address_id)}>
            <Text style={styles.setDefault}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => editAddress(item)}>
          <Text style={styles.edit}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteAddress(item.address_id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>

      {item.is_default && <Text style={styles.defaultTag}>★ Default</Text>}
    </View>
  );

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Saved Addresses</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.address_id.toString()}
        renderItem={renderAddress}
        contentContainerStyle={{ paddingBottom: 120 }}
      />

      {/* ➕ Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          resetForm();
          setShowModal(true);
        }}
      >
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* 🧾 Add/Edit Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.sectionTitle}>
                {editingId ? "Edit Address" : "Add Address"}
              </Text>

              {[
                { key: "name", label: "Name" },
                { key: "phone", label: "Phone", keyboardType: "phone-pad" },
                { key: "address_line1", label: "Address Line 1" },
                { key: "address_line2", label: "Address Line 2" },
                { key: "floor_no", label: "Floor No (optional)" },
                { key: "landmark", label: "Landmark (optional)" },
                { key: "city", label: "City" },
                { key: "state", label: "State" },
                { key: "pincode", label: "Pincode", keyboardType: "number-pad" },
              ].map(({ key, label, keyboardType }) => (
                <TextInput
                  key={key}
                  placeholder={label}
                  placeholderTextColor="#4d4d4d"
                  value={newAddress[key]}
                  onChangeText={(val) =>
                    setNewAddress({ ...newAddress, [key]: val })
                  }
                  style={styles.input}
                  keyboardType={keyboardType || "default"}
                />
              ))}

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  style={[styles.saveButton, { flex: 1, marginRight: 6 }]}
                  onPress={handleSave}
                >
                  <Text style={styles.saveButtonText}>
                    {editingId ? "Update" : "Save"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.cancelButton, { flex: 1, marginLeft: 6 }]}
                  onPress={resetForm}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
