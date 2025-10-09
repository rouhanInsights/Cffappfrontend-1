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
  useEffect(() => {
  const checkGuest = async () => {
    const guest = await AsyncStorage.getItem('guestMode');
    if (guest === 'true') {
      Alert.alert(
        'Login Required',
        'Please log in to proceed .',
        [{ text: 'Login', onPress: () => navigation.replace('Auth') }]
      );
    }
  };
  checkGuest();
}, []);


  const getValidDeliveryDates = () => {
    const now = new Date();
    const validDates = [];
    let i = 0;

    while (validDates.length < 4) {
      const date = new Date();
      date.setDate(now.getDate() + i);
      const iso = date.toISOString().split("T")[0];

      const isMonday = date.getDay() === 1;

      // 🚫 exclude Mondays only
      if (!isMonday) {
        validDates.push(iso);
      }

      i++;
    }

    return validDates;
  };




  const getDisabledDates = () => {
    const today = new Date();
    const disabled = {};
    const validDates = getValidDeliveryDates();

    for (let i = -30; i <= 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const iso = date.toISOString().split('T')[0];

      if (!validDates.includes(iso)) {
        disabled[iso] = {
          disabled: true,
          disableTouchEvent: true
        };
      }
    }

    return disabled;
  };


  const getMondayHighlights = () => {
  const highlights = {};
  const today = new Date();

  for (let i = 0; i <= 90; i++) { // next 3 months is enough
    const date = new Date();
    date.setDate(today.getDate() + i);

    if (date.getDay() === 1) { // Monday
      const iso = date.toISOString().split("T")[0];
      highlights[iso] = {
        customStyles: {
          container: {
            backgroundColor: "#ffeaea", // light red background
            borderRadius: 20,
          },
          text: {
            color: "#D32F2F", // red text
            fontWeight: "bold",
          },
        },
      };
    }
  }

  return highlights;
};




  const getInitialValidDate = () => {
    return getValidDeliveryDates()[0];
  };


  const paymentOptions = [
    { value: 'COD', label: 'Cash on Delivery' },
    { value: 'Pay Online', label: 'Pay Online' },

  ];

  useEffect(() => {
    const validDate = getValidDeliveryDates()[0];
    setDeliveryDate(validDate);
    setIsAfter9am(new Date().getHours() >= 9);

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
          setSelectedSlotId(null); // ❌ don’t pre-select
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
  const handleConfirmOrder = async () => {
    if (subtotal < 300) {
      Alert.alert(
        "Add More Items",
        "Minimum order value is ₹300 (excluding delivery charges). Please add more items to your cart."
      );
      return;
    }
    const selected = new Date(deliveryDate);
    if (selected.getDay() === 1) {
      Alert.alert('Outlet Closed', 'Our Outlets are Closed on Mondays');
      return;
    }

    if (!selectedAddress) {
      Alert.alert('Missing Info', 'Please select a delivery address.');
      return;
    }
    if (!deliveryDate) {
      Alert.alert('Missing Info', 'Please select a delivery date.');
      return;
    }
    if (!selectedSlotId) {
      Alert.alert('Missing Info', 'Please select a delivery time slot.');
      return;
    }
    if (!paymentMethod) {
      Alert.alert('Missing Info', 'Please select a payment method.');
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
        theme: { color: '#a8e07aff' },
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
                    <Text style={{ color: '#2267e0ff' }}>Edit</Text>
                  </TouchableOpacity>

                  {!addr.is_default && (
                    <TouchableOpacity onPress={() => handleSetDefault(addr.address_id)}>
                      <Text style={{ color: 'rgba(36, 180, 0, 1)' }}>Set as Default</Text>
                    </TouchableOpacity>
                  )}
                  {addr.is_default && (
                    <Text style={{ color: '#f6b800ff' }}>★ Default</Text>
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

            <View
              style={{
                backgroundColor: "#ffffff",
                borderRadius: 8,
                padding: 8,
                elevation: 3,
              }}
            >
              <Calendar
                style={{
                  backgroundColor: "#ffffff", // ✅ white wrapper background
                  borderRadius: 8,
                }}
                theme={{
                  backgroundColor: "#ffffff",
                  calendarBackground: "#ffffff",
                  textSectionTitleColor: "#000000",
                  dayTextColor: "#000000",
                  monthTextColor: "#000000",
                  arrowColor: "#006b3d",
                  todayTextColor: "#1E90FF",
                  selectedDayBackgroundColor: "#006b3d",
                  selectedDayTextColor: "#ffffff",
                  textDisabledColor: "#c1c1c1",
                }}
                minDate={new Date().toISOString().split("T")[0]}
                markingType="custom"
                markedDates={{
                  ...getDisabledDates(),
                  ...getMondayHighlights(),
                  [deliveryDate]: {
                    selected: true,
                    customStyles: {
                      container: {
                        backgroundColor: "#006b3d",
                        borderRadius: 20,
                      },
                      text: {
                        color: "#ffffff",
                        fontWeight: "bold",
                      },
                    },
                  },
                }}
                dayComponent={({ date, state, marking }) => {
                  const todayISO = new Date().toISOString().split("T")[0];
                  const validDates = getValidDeliveryDates();
                  const isValid = validDates.includes(date.dateString);
                  const isPast = date.dateString < todayISO;
                  const isSelected = marking?.selected;

                  const handlePress = () => {
                    if (isValid && !isPast) setDeliveryDate(date.dateString);
                  };

                  return (
                    <TouchableOpacity
                      disabled={!isValid || isPast}
                      onPress={handlePress}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: 42,
                        width: 42,
                        borderRadius: 21,
                        margin: 1,
                        backgroundColor: isSelected ? "#006b3d" : "#ffffff", // ✅ white for all, green when selected
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected
                            ? "#ffffff"
                            : isValid
                              ? "#000000"
                              : "#b0b0b0",
                          fontWeight: isSelected ? "bold" : "normal",
                        }}
                      >
                        {date.day}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
                onDayPress={(day) => {
                  if (getValidDeliveryDates().includes(day.dateString)) {
                    setDeliveryDate(day.dateString);
                  }
                }}
                disableAllTouchEventsForDisabledDays={true}
              />
            </View>

            {new Date(deliveryDate).getDay() === 1 && (
              <Text style={{ color: "red", marginTop: 8, fontWeight: "bold" }}>
                Our Outlets are Closed on Mondays
              </Text>
            )}

            {/* Delivery Time */}
            <Text style={styles.sectionTitle}>Select Delivery Time</Text>
            <View style={styles.buttonGroup}>
              {availableSlots.map((slot) => {
                const now = new Date();
                const todayISO = new Date().toISOString().split("T")[0];
                const isToday = deliveryDate === todayISO;

                // Parse slot label like "8:00 AM - 10:00 AM"
                const parseTimeRange = (slotStr) => {
                  const [start, end] = slotStr.split("-");
                  const parse = (t) => {
                    const [time, modifier] = t.trim().split(" ");
                    let [hours, minutes] = time.split(":").map(Number);
                    if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
                    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
                    return { hours, minutes: minutes || 0 };
                  };
                  return { start: parse(start), end: parse(end) };
                };

                const { end } = parseTimeRange(slot.slot_details);
                let hideThisSlot = false;

                if (isToday) {
                  if (now.getHours() >= 10) {
                    // 🚫 After 10 AM → no same-day slots allowed
                    hideThisSlot = true;
                  } else if (now.getHours() >= 6) {
                    // After 6 AM but before 10 AM → only show 10AM–12PM
                    if (!slot.slot_details.includes("10") || !slot.slot_details.includes("12")) {
                      hideThisSlot = true;
                    }
                  } else {
                    // Before 6 AM → hide slots that already ended
                    if (
                      now.getHours() > end.hours ||
                      (now.getHours() === end.hours && now.getMinutes() >= end.minutes)
                    ) {
                      hideThisSlot = true;
                    }
                  }
                }

                if (hideThisSlot) return null;

                return (
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
                );
              })}
            </View>

            {/* Show warning if after 9 AM and today selected */}
            {deliveryDate === new Date().toISOString().split("T")[0] && isAfter9am && (
              <Text style={styles.warningText}>
                Orders placed after 9 AM will be delivered the next day.
              </Text>
            )}

          </View>

          {/* Order Summary & Payment */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartProductList.map((item) => (
              <View key={item.product_id} style={styles.cartTextBold}>
                <Text style={styles.cartTextBold}>{item.name} × {item.quantity}</Text>
                <Text style={styles.cartText}>₹{item.quantity * item.price}</Text>
              </View>
            ))}
            <View style={styles.cartItem}>
              <Text style={styles.cartText}>Subtotal</Text>
              <Text style={styles.cartText}>₹{subtotal}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text style={styles.cartText}>Shipping</Text>
              <Text>₹{shippingFee}</Text>
            </View>
            <View style={styles.cartItem}>
              <Text style={styles.cartTextBold}>Total</Text>
              <Text style={styles.cartTextBold}>₹{total}</Text>
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
                <Text style={styles.paymentText}>{option.label}</Text>
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
        <View style={{ flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#20202025', color: '#020202ff' }}>
          <View style={{ backgroundColor: '#f7f7f7ff', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10, color: '#000000ff' }}>Add Address</Text>

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
                placeholderTextColor="#4b4b4bff"
                value={newAddress[key]}
                onChangeText={(val) => setNewAddress(prev => ({ ...prev, [key]: val }))}
                keyboardType={keyboardType || 'default'}
                style={{ borderBottomWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 6, color: '#000000ff', }}
              />
            ))}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddAddress}>
                <Text style={{ color: '#00aa03ff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutScreen;
