import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        // Delay for logo visibility (2s), then navigate
        setTimeout(() => {
          if (token) {
            navigation.replace('Main'); // ✅ already logged in
          } else {
            navigation.replace('Onboarding'); // ❌ show onboarding/login
          }
        }, 2000);
      } catch (err) {
        console.error('Auto-login error:', err);
        navigation.replace('Onboarding'); // fallback on error
      }
    };

    checkLoginStatus();
  }, []);
const logoimg=resolveAssetSource(require('../images/logo.jpg'))
  return (
    <View style={styles.container}>
      <Image source={logoimg} style={{ width: 350, height: 120 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fdfffeff',
  },
});