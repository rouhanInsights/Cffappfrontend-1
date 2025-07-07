import  { useRef, useEffect, useState } from 'react';
import { View,  FlatList, Image, ScrollView, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styles from '../styles/LoginStyles';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'; 
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
const slides = [
  {
    id: '1',
    title: 'Fresh Meat Delivered',
    image: resolveAssetSource(require('../images/slider1.asset.jpg')),
  },
  {
    id: '2',
    title: 'Quality Fish Daily',
    image: resolveAssetSource(require('../images/slider2.asset.jpg')),
  },
  {
    id: '3',
    title: 'Hygienic & Fast Delivery',
    image: resolveAssetSource(require('../images/slider3.asset.jpg')),
  },
];

export default function LoginScreen({ navigation }) {
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false); // For cooldown functionality
  const [countdown, setCountdown] = useState(30); // 30-second cooldown for resend

  const BASE_URL = API_BASE_URL; // 🔁 Replace with your actual local IP

  // Slider autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle countdown for resend OTP
  useEffect(() => {
    if (resendCooldown && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup on component unmount or cooldown stop
    }
    if (countdown === 0) {
      setResendCooldown(false); // Allow resend after cooldown
    }
  }, [resendCooldown, countdown]);

  const sendOtp = async () => {
    if (contact.trim() === '') {
      Alert.alert('Error', 'Please enter phone number or email');
      return;
    }

    const body = contact.includes('@') ? { email: contact } : { phone: contact };

    try {
      const response = await fetch(`${BASE_URL}/api/users/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setResendCooldown(true); // Start cooldown for resend
        setCountdown(30); // Reset countdown
        Alert.alert('Success', data.message || 'OTP sent!');
      } else {
        Alert.alert('Error', data.error || 'OTP failed');
      }
    } catch (err) {
      console.error('Send OTP Error:', err);
      Alert.alert('Error', 'Network error');
    }
  };

  const verifyOtp = async () => {
    if (otp.trim() === '') {
      Alert.alert('Error', 'Enter OTP');
      return;
    }

    const body = contact.includes('@')
      ? { email: contact, otp_code: otp }
      : { phone: contact, otp_code: otp };

    try {
      const response = await fetch(`${BASE_URL}/api/users/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        Alert.alert('Success', 'Login successful');

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          })
        );
      } else {
        Alert.alert('Error', data.error || 'Invalid OTP');
      }
    } catch (err) {
      console.error('Verify OTP Error:', err);
      Alert.alert('Error', 'Network error');
    }
  };

  const resendOtp = async () => {
    if (contact.trim() === '') {
      Alert.alert('Error', 'Please enter phone number or email');
      return;
    }

    const body = contact.includes('@') ? { email: contact } : { phone: contact };

    try {
      const response = await fetch(`${BASE_URL}/api/users/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        setResendCooldown(true);
        setCountdown(30); // Reset countdown for resend
        Alert.alert('Success', data.message || 'OTP resent successfully');
      } else {
        Alert.alert('Error', data.error || 'Failed to resend OTP');
      }
    } catch (err) {
      console.error('Resend OTP Error:', err);
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        scrollEnabled={false}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={item.image} style={styles.image} />
          </View>
        )}
      />

      <View style={styles.container}>
        <TextInput
          label="Phone or Email"
          value={contact}
          onChangeText={setContact}
          style={styles.input}
          keyboardType="email-address"
        />

        {otpSent && (
          <TextInput
            label="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
            keyboardType="numeric"
          />
        )}

        <Button mode="contained" onPress={otpSent ? verifyOtp : sendOtp} style={styles.link}>
          {otpSent ? 'Verify OTP' : 'Send OTP'}
        </Button>

        {otpSent && !resendCooldown && (
          <Button mode="text" onPress={resendOtp} style={styles.resendButton}>
            Resend OTP ({countdown}s)
          </Button>
        )}

        {otpSent && resendCooldown && (
          <Button mode="text" disabled style={styles.resendButton}>
            Resend OTP (Wait {countdown}s)
          </Button>
        )}
      </View>
    </ScrollView>
  );
}
