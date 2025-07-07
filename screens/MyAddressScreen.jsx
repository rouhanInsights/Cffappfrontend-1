import  { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, TextInput, Alert, FlatList, StyleSheet, ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from '../styles/AddressStyles';
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
export default function MyAddressScreen() {
  const [addresses, setAddresses] = useState([]);
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
  const [showForm, setShowForm] = useState(false);

  const BASE_URL = API_BASE_URL; // replace with your actual backend URL

  const fetchAddresses = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/api/users/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) {
      setAddresses(data);
    }
  };

  const addAddress = async () => {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/api/users/addresses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newAddress, is_default: addresses.length === 0 }),
    });
    const data = await res.json();
    if (res.ok) {
      Alert.alert('Success', 'Address added successfully');
      setNewAddress({
        name: '', phone: '', address_line1: '', address_line2: '',
         floor_no: '', landmark: '', city: '', state: '', pincode: ''
      });
      setShowForm(false);
      fetchAddresses();
    } else {
      Alert.alert('Error', data.error || 'Failed to add address');
    }
  };

  const setDefault = async (id) => {
    const token = await AsyncStorage.getItem('token');
    await fetch(`${BASE_URL}/api/users/addresses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ is_default: true }),
    });
    fetchAddresses();
  };

  const deleteAddress = async (id) => {
    const token = await AsyncStorage.getItem('token');
    await fetch(`${BASE_URL}/api/users/addresses/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAddresses();
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const renderAddress = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.addrName}>{item.name}</Text>
      <Text>{item.address_line1}, {item.address_line2}, </Text>
      {item.floor_no ? <Text style={styles.addrDetail}>Floor: {item.floor_no}</Text> : null}
      {item.landmark ? <Text style={styles.addrDetail}>Landmark: {item.landmark}</Text> : null}
      <Text>{item.city}, {item.state}, {item.pincode}</Text>
      <Text>Phone: {item.phone}</Text>

      <View style={styles.addrActions}>
        {!item.is_default && (
          <TouchableOpacity onPress={() => setDefault(item.address_id)}>
            <Text style={styles.setDefault}>Set as Default</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => deleteAddress(item.address_id)}>
          <Text style={styles.delete}>Delete</Text>
        </TouchableOpacity>
      </View>

      {item.is_default && <Text style={styles.defaultTag}>★ Default</Text>}
    </View>
  );

  const renderFormFields = () => (
    <View style={styles.form}>
      <Text style={styles.sectionTitle}>Add New Address</Text>

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
          value={newAddress[key]}
          onChangeText={(val) => setNewAddress({ ...newAddress, [key]: val })}
          style={optional ? styles.optionalInput : styles.input}
          keyboardType={keyboardType || 'default'}
        />
      ))}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
        <TouchableOpacity style={[styles.saveButton, { flex: 1, marginRight: 6 }]} onPress={addAddress}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: '#aaa', flex: 1, marginLeft: 6 }]}
          onPress={() => setShowForm(false)}
        >
          <Text style={styles.saveButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (addresses.length === 0) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Add Your First Address</Text>
        {renderFormFields()}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Saved Addresses</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.address_id.toString()}
        renderItem={renderAddress}
        contentContainerStyle={{ paddingBottom: showForm ? 300 : 100 }}
      />

      {showForm && renderFormFields()}

      {!showForm && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setShowForm(true)}
        >
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}
