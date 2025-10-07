import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  FlatList,
  Modal,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/AddressStyles';
import { API_BASE_URL } from '@env';

export default function MyAddressScreen() {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    floor_no: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const fetchAddresses = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/api/users/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setAddresses(data);
  };

  const resetForm = () => {
    setNewAddress({
      name: '',
      phone: '',
      address_line1: '',
      address_line2: '',
      floor_no: '',
      landmark: '',
      city: '',
      state: '',
      pincode: '',
    });
    setEditingId(null);
    setShowModal(false);
  };

  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `${API_BASE_URL}/api/users/addresses/${editingId}`
      : `${API_BASE_URL}/api/users/addresses`;

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...newAddress,
        is_default: !editingId && addresses.length === 0,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      Alert.alert('Success', editingId ? 'Address updated' : 'Address added');
      resetForm();
      fetchAddresses();
    } else {
      Alert.alert('Error', data.error || 'Operation failed');
    }
  };

  const setDefault = async (id) => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${API_BASE_URL}/api/users/addresses/${id}/default`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      fetchAddresses();
    } else {
      const data = await res.json();
      Alert.alert("Error", data.error || "Failed to set default address");
    }
  };

  const deleteAddress = async (id) => {
    const token = await AsyncStorage.getItem('token');
    await fetch(`${API_BASE_URL}/api/users/addresses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAddresses();
  };

  const renderAddress = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.addrName}>{item.name}</Text>
      <Text style={styles.addrText}>{item.address_line1}, {item.address_line2}</Text>
      {item.floor_no ? <Text style={styles.addrText}>Floor: {item.floor_no}</Text> : null}
      {item.landmark ? <Text style={styles.addrText}>Landmark: {item.landmark}</Text> : null}
      <Text style={styles.addrText}>{item.city}, {item.state}, {item.pincode}</Text>
      <Text style={styles.addrText}>Phone: {item.phone}</Text>

      <View style={styles.addrActions}>
        {!item.is_default && (
          <TouchableOpacity onPress={() => setDefault(item.address_id)}>
            <Text style={styles.setDefault}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => {
          setNewAddress(item);
          setEditingId(item.address_id);
          setShowModal(true);
        }}>
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

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          setNewAddress({
            name: '', phone: '', address_line1: '', address_line2: '',
            floor_no: '', landmark: '', city: '', state: '', pincode: ''
          });
          setEditingId(null);
          setShowModal(true);
        }}
      >
        <AntDesign name="plus" size={24} color="#ffffffff" />
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.sectionTitle}>
                {editingId ? 'Edit Address' : 'Add Address'}
              </Text>

              {[
                { key: 'name', label: 'Name' },
                { key: 'phone', label: 'Phone', keyboardType: 'phone-pad' },
                { key: 'address_line1', label: 'Address Line 1' },
                { key: 'address_line2', label: 'Address Line 2' },
                { key: 'floor_no', label: 'Floor No (optional)', optional: true },
                { key: 'landmark', label: 'Landmark (optional)', optional: true },
                { key: 'city', label: 'City' },
                { key: 'state', label: 'State' },
                { key: 'pincode', label: 'Pincode', keyboardType: 'number-pad' },
              ].map(({ key, label, keyboardType, optional }) => (
                <TextInput
                  key={key}
                  placeholder={label}
                  placeholderTextColor="#4d4d4dff"
                  value={newAddress[key]}
                  onChangeText={(val) => setNewAddress({ ...newAddress, [key]: val })}
                  style={optional ? styles.optionalInput : styles.input}
                  keyboardType={keyboardType || 'default'}
                />
              ))}

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <TouchableOpacity style={[styles.saveButton, { flex: 1, marginRight: 6 }]} onPress={handleSave}>
                  <Text style={styles.saveButtonText}>{editingId ? 'Update' : 'Save'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.cancelButton, { flex: 1, marginLeft: 6 }]} onPress={resetForm}>
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
