import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/Navbar';
import { useCart } from '../contexts/CartContext';
import styles from '../styles/CheckoutStyles';

// ✅ Bulletproof delivery date calculator
const getBaseDeliveryDate = () => {
  const now = new Date();
  const midnightToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const baseDate = new Date(midnightToday);
  if (now.getHours() >= 9) {
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return baseDate;
};

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

  const BASE_URL = API_BASE_URL;

  const paymentOptions = [
    { value: 'COD', label: 'Cash on Delivery' },
    { value: 'UPI', label: 'UPI / Google Pay / PhonePe' },
    { value: 'NETBANKING', label: 'Net Banking' },
    { value: 'CARD', label: 'Credit / Debit Card' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem('token');

        const addrRes = await fetch(`${BASE_URL}/api/users/addresses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const addrData = await addrRes.json();
        if (addrRes.ok) {
          setAddresses(addrData);
          const defaultAddr = addrData.find((a) => a.is_default) || addrData[0];
          setSelectedAddress(defaultAddr);
        }

        const slotRes = await fetch(`${BASE_URL}/api/slots`);
        const slotData = await slotRes.json();
        if (slotRes.ok) {
          setAvailableSlots(slotData);
          setSelectedSlotId(slotData[0]?.slot_id);
        }

        const prodRes = await fetch(`${BASE_URL}/api/products`);
        const prodData = await prodRes.json();
        if (prodRes.ok) setAllProducts(prodData);

        const now = new Date();
        const baseDate = getBaseDeliveryDate();
        setIsAfter9am(now.getHours() >= 9);
        setDeliveryDate(baseDate.toISOString().split('T')[0]);
      } catch (error) {
        console.error('Checkout Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cartProductList = Object.entries(cartItems)
    .map(([id, qty]) => {
      const product = allProducts.find((p) => p.product_id === parseInt(id));
      if (!product) return null;
      return {
        ...product,
        quantity: qty,
        price: product.sale_price || product.price,
      };
    })
    .filter(Boolean);

  const subtotal = cartProductList.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const shippingFee = 30;
  const total = subtotal + shippingFee;

  const handleConfirmOrder = async () => {
    if (!selectedAddress || !paymentMethod || !selectedSlotId || !deliveryDate) {
      Alert.alert('Missing Info', 'Please fill all required fields.');
      return;
    }

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
      console.error('Order Placement Error:', error);
      Alert.alert('Error', 'Something went wrong while placing the order.');
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
              <TouchableOpacity
                key={addr.address_id}
                style={[
                  styles.selectBtn,
                  selectedAddress?.address_id === addr.address_id && styles.selectBtnActive,
                ]}
                onPress={() => setSelectedAddress(addr)}
              >
                <Text style={styles.selectBtnText}>
                  {addr.address_line1}, {addr.city}, {addr.pincode}
                </Text>
                {addr.floor_no && <Text style={styles.optionalText}>Floor: {addr.floor_no}</Text>}
                {addr.landmark && <Text style={styles.optionalText}>Landmark: {addr.landmark}</Text>}
              </TouchableOpacity>
            ))}

            <Text style={styles.sectionTitle}>Select Delivery Date</Text>
            <View style={styles.buttonGroup}>
              {(() => {
                const base = getBaseDeliveryDate();
                return Array.from({ length: 3 }).map((_, i) => {
                  const date = new Date(base);
                  date.setDate(base.getDate() + i);
                  const formatted =
                    date.getFullYear() + '-' +
                    String(date.getMonth() + 1).padStart(2, '0') + '-' +
                    String(date.getDate()).padStart(2, '0');
                  return (
                    <TouchableOpacity
                      key={formatted}
                      style={[
                        styles.selectBtn,
                        deliveryDate === formatted && styles.selectBtnActive,
                      ]}
                      onPress={() => setDeliveryDate(formatted)}
                    >
                      <Text style={styles.selectBtnText}>{formatted}</Text>
                    </TouchableOpacity>
                  );
                });
              })()}
            </View>

            <Text style={styles.sectionTitle}>Select Delivery Time</Text>
            <View style={styles.buttonGroup}>
              {availableSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.slot_id}
                  style={[
                    styles.selectBtn,
                    slot.slot_id === selectedSlotId && styles.selectBtnActive,
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

          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartProductList.map((item) => (
              <View key={item.product_id} style={styles.cartItem}>
                <Text>{item.name} × {item.quantity}</Text>
                <Text>₹{item.quantity * item.price}</Text>
              </View>
            ))}
            <View style={styles.cartItem}>
              <Text style={{ fontWeight: '600' }}>Subtotal</Text>
              <Text>₹{subtotal}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text style={{ fontWeight: '600' }}>Shipping</Text>
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
    </View>
  );
};

export default CheckoutScreen;
