import { useState, useEffect } from 'react';
import { View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles from '../styles/LoginStyles';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

export default function LoginScreen({ navigation }) {
  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const BASE_URL = API_BASE_URL;

  // 🕒 Countdown Effect
  useEffect(() => {
    let timer;
    if (resendCooldown) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendCooldown(false);
            return 30; // reset timer for next use
          }
          return prev - 1;
        });
      }, 1000);
    }

    // cleanup timer on unmount
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // ✅ Skip Login Function
  const handleSkipLogin = async () => {
    await AsyncStorage.setItem('guestMode', 'true');
    await AsyncStorage.removeItem('token');
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      })
    );
  };

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
        setResendCooldown(true);
        setCountdown(30);
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
    ? { email: contact, otp }
    : { phone: contact, otp };

  try {
    const response = await fetch(`${BASE_URL}/api/users/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (response.ok) {
      await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('guestMode', 'false');

      Alert.alert('Success', 'Login successful');

      // ✅ check redirect target
      const redirectAfterLogin = await AsyncStorage.getItem('redirectAfterLogin');
      if (redirectAfterLogin === 'Checkout') {
        await AsyncStorage.removeItem('redirectAfterLogin');
        navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: 'Main',
          state: {
            index: 0, // 👈 selects the Home tab
            routes: [
              {
                name: 'Home', // this matches your tab name
                state: {
                  routes: [{ name: 'CheckoutScreen' }], // 👈 open Checkout inside HomeStack
                },
              },
            ],
          },
        },
      ],
    })
  );
      } else {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Main' }], // normal flow
          })
        );
      }
    } else {
      Alert.alert('Error', data.error || 'Invalid OTP');
    }
  } catch (err) {
    console.error('Verify OTP Error:', err);
    Alert.alert('Error', 'Network error');
  }
};


  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Skip Button */}
      <TouchableOpacity
        style={{ position: 'absolute', top: 50, right: 20, zIndex: 10 }}
        onPress={handleSkipLogin}
      >
        <Text
          style={{
            color: '#006B3D',
            marginRight: 15,
            marginTop: 40,
            fontWeight: 'bold',
            fontSize: 18,
          }}
        >
          SKIP
        </Text>
      </TouchableOpacity>

      {/* Logo */}
      <View style={styles.header}>
        <Image source={require('../images/logo1.png')} style={styles.logo} />
      </View>

      {/* Login Form */}
      <View style={styles.container}>
        <Text style={styles.loginTitle}>Login</Text>

        <TextInput
          label="Phone or Email"
          value={contact}
          onChangeText={setContact}
          style={styles.input}
          keyboardType="email-address"
          mode="outlined"
        />

        {otpSent && (
          <TextInput
            label="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
            keyboardType="numeric"
            mode="outlined"
          />
        )}

        <Button
          mode="contained"
          onPress={otpSent ? verifyOtp : sendOtp}
          style={styles.button}
        >
          {otpSent ? 'Verify OTP' : 'Send OTP'}
        </Button>

        {otpSent && (
          <Button
            mode="text"
            onPress={sendOtp}
            disabled={resendCooldown}
            style={styles.resendButton}
          >
            {resendCooldown
              ? `Resend OTP (Wait ${countdown}s)`
              : 'Resend OTP'}
          </Button>
        )}
      </View>
    </ScrollView>
  );
}
