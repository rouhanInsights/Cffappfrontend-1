import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@env';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import NavBar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/CheckoutStyles';
import { RAZORPAY_KEY_ID } from '@env';


const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cartItems, clearCart } = useCart();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [allProducts, setAllProducts] = useState([]);
  const [isAfter9am, setIsAfter9am] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

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

  const BASE_URL = API_BASE_URL;

  const getValidDeliveryDates = () => {
  const today = new Date();
  const validDates = [];

  let i = 0;
  while (validDates.length < 3) {
    const date = new Date();
    date.setDate(today.getDate() + i);

    // Skip Monday (getDay() === 1)
    if (date.getDay() !== 1) {
      validDates.push(date.toISOString().split('T')[0]);
    }

    i++;
  }

  return validDates;
};

const getDisabledDates = () => {
  const today = new Date();
  const disabled = {};
  const validDates = getValidDeliveryDates();

  for (let i = -30; i <= 30; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    const iso = date.toISOString().split('T')[0];

    if (!validDates.includes(iso)) {
      disabled[iso] = { disabled: true, disableTouchEvent: true };
    }
  }

  return disabled;
};

const getInitialValidDate = () => {
  return getValidDeliveryDates()[0];
};


  const paymentOptions = [
    { value: 'COD', label: 'Cash on Delivery' },
    { value: 'UPI', label: 'UPI / Google Pay / PhonePe' },
    { value: 'NETBANKING', label: 'Net Banking' },
    { value: 'CARD', label: 'Credit / Debit Card' },
  ];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');

        const [addrRes, slotRes, prodRes] = await Promise.all([
          fetch(`${BASE_URL}/api/users/addresses`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${BASE_URL}/api/slots`),
          fetch(`${BASE_URL}/api/products`),
        ]);

        const [addrData, slotData, prodData] = await Promise.all([
          addrRes.json(),
          slotRes.json(),
          prodRes.json(),
        ]);

        if (addrRes.ok) {
          setAddresses(addrData);
          setSelectedAddress(addrData.find((a) => a.is_default) || addrData[0]);
        }

        if (slotRes.ok) {
          setAvailableSlots(slotData);
          setSelectedSlotId(slotData[0]?.slot_id);
        }

        if (prodRes.ok) setAllProducts(prodData);

        const validDate = getInitialValidDate();
        setDeliveryDate(validDate);
        setIsAfter9am(new Date().getHours() >= 9);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleAddAddress = async () => {
  const { name, phone, address_line1, city, state, pincode } = newAddress;
  if (!name || !phone || !address_line1 || !city || !state || !pincode) {
    Alert.alert('Missing Info', 'Please fill all required fields.');
    return;
  }

  try {
    const token = await AsyncStorage.getItem('token');
    const method = editingAddressId ? 'PUT' : 'POST';
    const url = editingAddressId
      ? `${BASE_URL}/api/users/addresses/${editingAddressId}`
      : `${BASE_URL}/api/users/addresses`;

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...newAddress,
        is_default: !editingAddressId && addresses.length === 0,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setModalVisible(false);
      setEditingAddressId(null);
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
      const updatedAddresses = editingAddressId
        ? addresses.map((a) => (a.address_id === data.address_id ? data : a))
        : [...addresses, data];
      setAddresses(updatedAddresses);
      setSelectedAddress(data);
    } else {
      Alert.alert('Error', data.error || 'Failed to save address');
    }
  } catch (err) {
    console.error('Save Address Error:', err);
    Alert.alert('Error', 'Something went wrong.');
  }
};
const handleSetDefault = async (addressId) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/api/users/addresses/${addressId}/default`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const updated = await res.json();
      const refreshed = addresses.map((addr) =>
        addr.address_id === updated.address.address_id
          ? { ...addr, is_default: true }
          : { ...addr, is_default: false }
      );
      setAddresses(refreshed);
      setSelectedAddress(updated.address);
    } else {
      const data = await res.json();
      Alert.alert('Error', data.error || 'Failed to update');
    }
  } catch (err) {
    console.error('Set Default Error:', err);
    Alert.alert('Error', 'Something went wrong.');
  }
};


  const cartProductList = Object.entries(cartItems)
    .map(([id, qty]) => {
      const product = allProducts.find((p) => p.product_id === parseInt(id));
      return product
        ? {
            ...product,
            quantity: qty,
            price: product.sale_price || product.price,
          }
        : null;
    })
    .filter(Boolean);

  const subtotal = cartProductList.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const shippingFee = 30;
  const total = subtotal + shippingFee;

  const placeOrderAfterPayment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const orderPayload = {
        total,
        address: `${selectedAddress.address_line1}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
        address_id: selectedAddress.address_id,
        slot_id: selectedSlotId,
        slot_date: deliveryDate,
        payment_method: paymentMethod,
        items: cartProductList.map((item) => ({
          id: item.product_id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      if (res.ok) {
        clearCart();
        navigation.reset({ index: 0, routes: [{ name: 'OrderSuccess' }] });
      } else {
        Alert.alert('Order Failed', data.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Order error:', error);
      Alert.alert('Error', 'Something went wrong.');
    }
  };

const handleConfirmOrder = async () => {
  const selected = new Date(deliveryDate);
  if (selected.getDay() === 1) {
    Alert.alert('Outlet Closed', 'Our Outlets are Closed on Mondays');
    return;
  }

  if (!selectedAddress || !paymentMethod || !selectedSlotId || !deliveryDate) {
    Alert.alert('Missing Info', 'Please complete all fields.');
    return;
  }

  const token = await AsyncStorage.getItem('token');

  const orderPayload = {
    total,
    address: `${selectedAddress.address_line1}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
    address_id: selectedAddress.address_id,
    slot_id: selectedSlotId,
    slot_date: deliveryDate,
    payment_method: paymentMethod,
    items: cartProductList.map((item) => ({
      id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    })),
  };

  const placeOrder = async () => {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderPayload),
    });

    const data = await res.json();
    if (res.ok) {
      clearCart();
      navigation.reset({ index: 0, routes: [{ name: 'OrderSuccess' }] });
    } else {
      Alert.alert('Order Failed', data.error || 'Something went wrong.');
    }
  };

  if (paymentMethod === 'COD') {
    await placeOrder();
    return;
  }

  // Handle Razorpay flow
  try {
    const orderRes = await fetch(`${BASE_URL}/api/payments/create-order`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: total }),
    });

    const orderData = await orderRes.json();
    if (!orderRes.ok) throw new Error(orderData.error || 'Failed to create Razorpay order');

    const options = {
      description: 'Calcutta Fresh Foods Payment',
      image: 'https://yourdomain.com/logo.png',
      currency: orderData.currency,
      key: RAZORPAY_KEY_ID,
      amount: orderData.amount,
      name: 'Calcutta Fresh Foods',
      order_id: orderData.order_id,
      prefill: {
        email: 'user@example.com',
        contact: selectedAddress.phone,
        name: selectedAddress.name,
      },
      theme: { color: '#81991f' },
      method: {
        netbanking: true,
        card: true,
        upi: true,
      },
    };

    RazorpayCheckout.open(options)
      .then(async (razorpayResponse) => {
        // ✅ Step 1: Record the payment
        await fetch(`${BASE_URL}/api/payments`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            order_id: orderData.order_id,
            amount: orderData.amount / 100,
            payment_method: paymentMethod,
            payment_status: 'Success',
          }),
        });

        // ✅ Step 2: Place the order
        await placeOrder();
      })
      .catch((error) => {
        console.warn('Razorpay error:', error);
        Alert.alert('Payment Failed', error.description || 'Transaction cancelled.');
      });
  } catch (err) {
    console.error('Payment Init Error:', err);
    Alert.alert('Error', err.message || 'Something went wrong.');
  }
};


  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container}>
        <View style={styles.checkoutWrapper}>
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Select Address</Text>
            {addresses.map((addr) => (
  <View key={addr.address_id} style={[styles.selectBtn, selectedAddress?.address_id === addr.address_id && styles.selectBtnActive]}>
    <TouchableOpacity onPress={() => setSelectedAddress(addr)}>
      <Text style={styles.selectBtnText}>
        {addr.name} - {addr.address_line1},{addr.address_line2},{addr.landmark},{addr.floor_no}, {addr.city}, {addr.pincode}
      </Text>
    </TouchableOpacity>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
      <TouchableOpacity
        onPress={() => {
          setNewAddress({
            name: addr.name,
            phone: addr.phone,
            address_line1: addr.address_line1,
            address_line2: addr.address_line2,
            floor_no: addr.floor_no,
            landmark: addr.landmark,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
          });
          setEditingAddressId(addr.address_id);
          setModalVisible(true);
        }}
      >
        <Text style={{ color: 'blue' }}>Edit</Text>
      </TouchableOpacity>

      {!addr.is_default && (
        <TouchableOpacity onPress={() => handleSetDefault(addr.address_id)}>
          <Text style={{ color: 'green' }}>Set as Default</Text>
        </TouchableOpacity>
      )}
      {addr.is_default && (
        <Text style={{ color: 'orange' }}>★ Default</Text>
      )}
    </View>
  </View>
))}


            <TouchableOpacity
              style={[styles.confirmBtn, { marginTop: 8 }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.confirmText}>+ Add New Address</Text>
            </TouchableOpacity>

            {/* Delivery Date */}

            <Text style={styles.sectionTitle}>Select Delivery Date</Text>
            <Calendar
  minDate={new Date().toISOString().split('T')[0]}
  markedDates={{
    ...getDisabledDates(),
    [deliveryDate]: { selected: true, selectedColor: '#81991f' },
  }}
  onDayPress={(day) => setDeliveryDate(day.dateString)}
  disableAllTouchEventsForDisabledDays={true}
/>

            {new Date(deliveryDate).getDay() === 1 && (
  <Text style={{ color: 'red', marginTop: 8, fontWeight: 'bold' }}>
    Our Outlets are Closed on Mondays
  </Text>
)}

            {/* Delivery Time */}
            <Text style={styles.sectionTitle}>Select Delivery Time</Text>
            <View style={styles.buttonGroup}>
              {availableSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.slot_id}
                  style={[
                    styles.selectBtn,
                    selectedSlotId === slot.slot_id && styles.selectBtnActive,
                  ]}
                  onPress={() => setSelectedSlotId(slot.slot_id)}
                >
                  <Text style={styles.selectBtnText}>{slot.slot_details}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {isAfter9am && (
              <Text style={styles.warningText}>
                Orders placed after 9 AM will be delivered the next day.
              </Text>
            )}
          </View>

          {/* Order Summary & Payment */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartProductList.map((item) => (
              <View key={item.product_id} style={styles.cartItem}>
                <Text>{item.name} × {item.quantity}</Text>
                <Text>₹{item.quantity * item.price}</Text>
              </View>
            ))}
            <View style={styles.cartItem}>
              <Text>Subtotal</Text>
              <Text>₹{subtotal}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text>Shipping</Text>
              <Text>₹{shippingFee}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text style={{ fontWeight: '700' }}>Total</Text>
              <Text style={{ fontWeight: '700' }}>₹{total}</Text>
            </View>

            <Text style={styles.sectionTitle}>Payment Method</Text>
            {paymentOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setPaymentMethod(option.value)}
                style={[
                  styles.paymentOption,
                  paymentMethod === option.value && styles.selectedPayment,
                ]}
              >
                <Text>{option.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirmOrder}>
              <Text style={styles.confirmText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Add Address</Text>

            {[
              { key: 'name', label: 'Name' },
              { key: 'phone', label: 'Phone', keyboardType: 'phone-pad' },
              { key: 'address_line1', label: 'Address Line 1' },
              { key: 'address_line2', label: 'Address Line 2' },
              { key: 'floor_no', label: 'Floor No (optional)' },
              { key: 'landmark', label: 'Landmark (optional)' },
              { key: 'city', label: 'City' },
              { key: 'state', label: 'State' },
              { key: 'pincode', label: 'Pincode', keyboardType: 'number-pad' }
            ].map(({ key, label, keyboardType }) => (
              <TextInput
                key={key}
                placeholder={label}
                value={newAddress[key]}
                onChangeText={(val) => setNewAddress(prev => ({ ...prev, [key]: val }))}
                keyboardType={keyboardType || 'default'}
                style={{ borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 6 }}
              />
            ))}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddAddress}>
                <Text style={{ color: 'green' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
