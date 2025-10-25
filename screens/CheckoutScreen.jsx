import React, { useState, useEffect } from "react";
import { API_BASE_URL, RAZORPAY_KEY_ID } from "@env";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import RazorpayCheckout from "react-native-razorpay";
import NavBar from "../components/Navbar";
import { useCart } from "../contexts/CartContext";
import styles from "../styles/CheckoutStyles";

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cartItems: contextCart, clearCart } = useCart();

  const passedCart = route.params?.cartItems;
  const cartItems =
    Object.keys(contextCart).length > 0 ? contextCart : passedCart || {};

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlotId, setSelectedSlotId] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
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

  const BASE_URL = API_BASE_URL;

  // ✅ Redirect guest users
  useEffect(() => {
    const checkGuest = async () => {
      const guest = await AsyncStorage.getItem("guestMode");
      if (guest === "true") {
        await AsyncStorage.setItem("redirectAfterLogin", "Checkout");
        Alert.alert("Login Required", "Please log in to proceed.", [
          { text: "Login", onPress: () => navigation.replace("Auth") },
        ]);
      }
    };
    checkGuest();
  }, []);

  // ✅ Delivery date logic (skip Mondays)
  const getValidDeliveryDates = () => {
    const now = new Date();
    const valid = [];
    let i = 0;
    while (valid.length < 4) {
      const d = new Date();
      d.setDate(now.getDate() + i);
      if (d.getDay() !== 1) valid.push(d.toISOString().split("T")[0]);
      i++;
    }
    return valid;
  };

  const getDisabledDates = () => {
    const today = new Date();
    const disabled = {};
    const validDates = getValidDeliveryDates();

    for (let i = -30; i <= 365; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      const iso = date.toISOString().split("T")[0];
      if (!validDates.includes(iso)) {
        disabled[iso] = { disabled: true, disableTouchEvent: true };
      }
    }
    return disabled;
  };

  const getMondayHighlights = () => {
    const highlights = {};
    const today = new Date();
    for (let i = 0; i <= 90; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      if (date.getDay() === 1) {
        const iso = date.toISOString().split("T")[0];
        highlights[iso] = {
          customStyles: {
            container: { backgroundColor: "#ffeaea", borderRadius: 20 },
            text: { color: "#D32F2F", fontWeight: "bold" },
          },
        };
      }
    }
    return highlights;
  };

  const paymentOptions = [
    { value: "COD", label: "Cash on Delivery" },
    { value: "Pay Online", label: "Pay Online" }, // ✅ Match enum exactly
  ];
  // ✅ Fetch addresses, slots, and products
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("userToken");
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
        }
        if (prodRes.ok) setAllProducts(prodData);

        // 🕒 Set delivery date based on time rules
        const now = new Date();
        const currentHour = now.getHours();

        if (currentHour >= 10) {
          // after 10AM → move to next valid date (skip Monday)
          const validDates = getValidDeliveryDates();
          setDeliveryDate(validDates[1] || validDates[0]);
        } else {
          setDeliveryDate(getValidDeliveryDates()[0]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  // ✅ Filter available slots dynamically by time
  const filteredSlots = (() => {
    const now = new Date();
    const hour = now.getHours();

    // After 10AM → same-day delivery unavailable
    if (hour >= 10 && deliveryDate === getValidDeliveryDates()[0]) {
      return [];
    }

    // After 6AM but before 10AM → remove first slot
    if (hour >= 6 && hour < 10 && deliveryDate === getValidDeliveryDates()[0]) {
      return availableSlots.slice(1);
    }

    // Before 6AM → show all slots
    return availableSlots;
  })();

  // ✅ Add or Edit address
  const handleAddAddress = async () => {
    const { name, phone, address_line1, city, state, pincode } = newAddress;
    if (!name || !phone || !address_line1 || !city || !state || !pincode) {
      Alert.alert("Missing Info", "Please fill all required fields.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      const method = editingAddressId ? "PUT" : "POST";
      const url = editingAddressId
        ? `${BASE_URL}/api/users/addresses/${editingAddressId}`
        : `${BASE_URL}/api/users/addresses`;

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
        const updated = editingAddressId
          ? addresses.map((a) => (a.address_id === data.address_id ? data : a))
          : [...addresses, data];
        setAddresses(updated);
        setSelectedAddress(data);
      } else Alert.alert("Error", data.error || "Failed to save address");
    } catch (err) {
      console.error("Save Address Error:", err);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  // ✅ Build cart
  const cartProductList = Object.entries(cartItems)
    .map(([id, item]) => {
      const quantity = typeof item === "object" ? item.quantity || 0 : item;
      const name = item.name || "Product";
      const price = item.price || 0;
      return { id, name, quantity, price };
    })
    .filter((i) => i.quantity > 0);

  const subtotal = cartProductList.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );
  const total = subtotal + 30;

  // ✅ Place order
  const handleConfirmOrder = async () => {
    if (subtotal < 300) {
      Alert.alert("Add More Items", "Minimum order value is ₹300.");
      return;
    }
    if (!selectedAddress) {
      Alert.alert("Missing Info", "Please select a delivery address.");
      return;
    }
    if (!selectedSlotId) {
      Alert.alert("Missing Info", "Please select a delivery slot.");
      return;
    }

    const token = await AsyncStorage.getItem("userToken");
    const orderPayload = {
      total,
      address: `${selectedAddress.address_line1}, ${selectedAddress.city} - ${selectedAddress.pincode}`,
      address_id: selectedAddress.address_id,
      slot_id: selectedSlotId,
      slot_date: deliveryDate,
      payment_method: paymentMethod,
      items: cartProductList.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    if (paymentMethod === "COD") {
      try {
        const res = await fetch(`${BASE_URL}/api/orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        });
        const data = await res.json();
        if (res.ok) {
          clearCart();
          navigation.reset({ index: 0, routes: [{ name: "OrderSuccess" }] });
        } else Alert.alert("Order Failed", data.error || "Something went wrong.");
      } catch (err) {
        console.error("COD Order Error:", err);
        Alert.alert("Error", "Could not place order.");
      }
      return;
    }

    // 🔹 Razorpay
    try {
      const res = await fetch(`${BASE_URL}/api/payments/create-order`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment init failed.");

      const options = {
        description: "Calcutta Fresh Foods Payment",
        currency: data.currency,
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
        name: "Calcutta Fresh Foods",
        order_id: data.order_id,
        prefill: {
          name: selectedAddress.name,
          contact: selectedAddress.phone,
        },
        theme: { color: "#006b3d" },
      };

      RazorpayCheckout.open(options)
        .then(async () => {
          await fetch(`${BASE_URL}/api/orders`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...orderPayload, payment_method: "Pay Online" }),
          });
          clearCart();
          navigation.reset({ index: 0, routes: [{ name: "OrderSuccess" }] });
        })
        .catch(() => {
          Alert.alert("Payment Cancelled", "You cancelled the transaction.");
        });
    } catch (err) {
      console.error("Razorpay Error:", err);
      Alert.alert("Error", "Payment initialization failed.");
    }
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#006b3d" />
        <Text>Loading Checkout...</Text>
      </View>
    );

  return (
    <View style={{ flex: 1 }}>
      <NavBar />
      <ScrollView style={styles.container}>
        <View style={styles.checkoutWrapper}>
          {/* ✅ Address Section */}
          <View style={styles.leftColumn}>
            <Text style={styles.sectionTitle}>Select Address</Text>
            {addresses.map((addr) => (
              <View
                key={addr.address_id}
                style={[
                  styles.selectBtn,
                  selectedAddress?.address_id === addr.address_id &&
                  styles.selectBtnActive,
                ]}
              >
                <TouchableOpacity onPress={() => setSelectedAddress(addr)}>
                  <Text style={styles.selectBtnText}>
                    {addr.name} - {addr.address_line1}, {addr.city},{" "}
                    {addr.pincode}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setNewAddress(addr);
                    setEditingAddressId(addr.address_id);
                    setModalVisible(true);
                  }}
                >
                  <Text style={{ color: "#2267e0ff" }}>Edit</Text>
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={[styles.confirmBtn, { marginTop: 8 }]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.confirmText}>+ Add New Address</Text>
            </TouchableOpacity>

            {/* ✅ Delivery Date */}
            <Text style={styles.sectionTitle}>Select Delivery Date</Text>
            <Calendar
              theme={{
                calendarBackground: "#fff",
                arrowColor: "#006b3d",
                todayTextColor: "#1E90FF",
                selectedDayBackgroundColor: "#006b3d",
                selectedDayTextColor: "#fff",
              }}
              minDate={new Date().toISOString().split("T")[0]}
              markingType="custom"
              markedDates={{
                ...getDisabledDates(),
                ...getMondayHighlights(),
                [deliveryDate]: {
                  selected: true,
                  customStyles: {
                    container: { backgroundColor: "#006b3d", borderRadius: 20 },
                    text: { color: "#fff", fontWeight: "bold" },
                  },
                },
              }}
              onDayPress={(day) => {
                if (getValidDeliveryDates().includes(day.dateString))
                  setDeliveryDate(day.dateString);
              }}
            />

            {/* ✅ Slots */}
            <Text style={styles.sectionTitle}>Select Delivery Slot</Text>
            {filteredSlots.length === 0 ? (
              <Text style={{ color: "red", marginBottom: 10 }}>
                Same-day delivery closed. Please choose next day.
              </Text>
            ) : (
              <View style={styles.buttonGroup}>
                {filteredSlots.map((slot) => (
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
            )}
          </View>

          {/* ✅ Order Summary */}
          <View style={styles.rightColumn}>
            <Text style={styles.sectionTitle}>Order Summary</Text>
            {cartProductList.length === 0 ? (
              <Text style={{ color: "#666" }}>
                Your cart is empty or unavailable.
              </Text>
            ) : (
              cartProductList.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Text style={styles.cartTextBold}>
                    {item.name} × {item.quantity}
                  </Text>
                  <Text style={styles.cartAmount}>
                    ₹{item.price * item.quantity}
                  </Text>
                </View>
              ))
            )}
            <View style={styles.cartItem}>
            <Text style={styles.cartText}>Subtotal</Text>
            <Text style={styles.cartAmount}>₹{subtotal}</Text>
          </View>

          <View style={styles.cartItem}>
            <Text style={styles.cartText}>Shipping</Text>
            <Text style={styles.cartAmount}>₹30</Text>
          </View>

          <View style={styles.cartItem}>
            <Text style={styles.cartTextBold}>Total</Text>
            <Text style={[styles.cartAmount, { fontWeight: "700" }]}>
              ₹{total}
            </Text>
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

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={handleConfirmOrder}
          >
            <Text style={styles.confirmText}>Place Order</Text>
          </TouchableOpacity>
        </View>
    </View>
        {/* ✅ Address Modal */ }
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
      setEditingAddressId(null);
    }}
  >
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>
          {editingAddressId ? "Edit Address" : "Add New Address"}
        </Text>

        <ScrollView>
          {[
            "name",
            "phone",
            "address_line1",
            "address_line2",
            "floor_no(optional)",
            "landmark(optional)",
            "city",
            "state",
            "pincode",
          ].map((field) => (
            <TextInput
              key={field}
              style={styles.input}
              placeholder={field.replace(/_/g, " ").toUpperCase()}
              value={newAddress[field]}
              onChangeText={(text) =>
                setNewAddress((prev) => ({ ...prev, [field]: text }))
              }
            />
          ))}
        </ScrollView>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity
            style={[styles.confirmBtn, { flex: 1, marginRight: 5 }]}
            onPress={handleAddAddress}
          >
            <Text style={styles.confirmText}>
              {editingAddressId ? "Update" : "Save"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmBtn,
              { flex: 1, backgroundColor: "#ccc", marginLeft: 5 },
            ]}
            onPress={() => {
              setModalVisible(false);
              setEditingAddressId(null);
            }}
          >
            <Text style={[styles.confirmText, { color: "#333" }]}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>

      </ScrollView >
    </View >
  );
};

export default CheckoutScreen;
