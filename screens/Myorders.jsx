import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import NavBar from '../components/Navbar';
import styles from '../styles/MyOrderStyles';
import FeedbackModal from '../components/FeedbackModal';
import { API_BASE_URL } from '@env';

const BASE_URL = API_BASE_URL;

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [submittedFeedback, setSubmittedFeedback] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${API_BASE_URL}/api/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.orders)) {
        setOrders(data.orders);
      } else {
        console.warn("Unexpected orders format:", data);
        setOrders([]);
      }
    } catch (err) {
      console.error('Order fetch error:', err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmittedFeedback = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await fetch(`${BASE_URL}/api/feedback/submitted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.order_ids)) {
        setSubmittedFeedback(data.order_ids);
      }
    } catch (err) {
      console.error('Failed to fetch submitted feedbacks', err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchSubmittedFeedback();
  }, []);

  const handleDownloadInvoice = async (orderId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const url = `${BASE_URL}/api/orders/${orderId}/invoice`;

      const fileName = `invoice-${orderId}.pdf`;
      const downloadDest = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission Denied', 'Storage permission is required to save invoice.');
          return;
        }
      }

      const downloadOptions = {
        fromUrl: url,
        toFile: downloadDest,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const result = await RNFS.downloadFile(downloadOptions).promise;

      if (result.statusCode === 200) {
        await FileViewer.open(downloadDest);
      } else {
        throw new Error(`Download failed with status ${result.statusCode}`);
      }
    } catch (err) {
      console.error('Invoice Download Error:', err);
      Alert.alert('Error', 'Failed to download or open invoice');
    }
  };

  const renderOrderItem = ({ item: order }) => (
    <View key={order.order_id} style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.orderId}>#{order.order_id}</Text>
        <Text style={styles.orderDate}>
          {order.order_date?.split('T')[0] || 'N/A'}
        </Text>
      </View>

      <Text style={styles.status}>
        <Ionicons name="checkbox" color="#2e7d32" size={16} /> {order.status}
      </Text>

      <Text style={styles.paymentInfo}>
        Payment: {order.payment_method} ({order.payment_status})
      </Text>

      <Text style={styles.deliveryInfo}>Delivered to: {order.full_address || order.address}</Text>
      <Text style={styles.slotInfo}>
        Time Slot: {order.slot_details || 'N/A'}
      </Text>

      <View style={styles.divider} />

      {Array.isArray(order.items) && order.items.map((item, idx) => (
        <View key={idx} style={styles.itemRow}>
          <Image source={{ uri: item.image_url }} style={styles.itemImage} />
          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
            <Text style={styles.itemPrice}>₹{item.price}</Text>
          </View>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total Paid:</Text>
        <Text style={styles.totalAmount}>₹{order.total}</Text>
      </View>

      <TouchableOpacity
        style={styles.invoiceButton}
        onPress={() => handleDownloadInvoice(order.order_id)}
      >
        <Text style={styles.invoiceButtonText}>Download Invoice</Text>
      </TouchableOpacity>

      {!submittedFeedback.includes(order.order_id) ? (
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => {
            setSelectedOrderId(order.order_id);
            setFeedbackVisible(true);
          }}
        >
          <Text style={styles.feedbackButtonText}>Leave Feedback</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ marginTop: 10, color: "#2e7d32", fontWeight: "600" }}>
          ✅ Feedback Submitted
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavBar />
      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          contentContainerStyle={styles.container}
          ListHeaderComponent={<Text style={styles.heading}>My Orders</Text>}
          data={orders}
          keyExtractor={(order) => order.order_id.toString()}
          renderItem={renderOrderItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              You have not placed any orders yet.
            </Text>
          }
        />
      )}

      {/* Feedback Modal */}
      <FeedbackModal
        visible={feedbackVisible}
        onClose={() => setFeedbackVisible(false)}
        orderId={selectedOrderId}
        onFeedbackSubmitted={(orderId) => {
          setSubmittedFeedback((prev) => [...prev, orderId]);
          setFeedbackVisible(false);
        }}
      />
    </SafeAreaView>
  );
}
