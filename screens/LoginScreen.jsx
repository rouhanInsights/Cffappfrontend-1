import { useState } from 'react';
import { View, ScrollView, Alert, Image } from 'react-native';
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

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Logo */}
      <View style={styles.header}>
        <Image
          source={require('../images/logo1.png')}
          style={styles.logo}
        />
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
