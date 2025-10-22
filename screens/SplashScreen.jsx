import React, { useEffect } from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';
import { useInAppUpdate } from '../hooks/useInAppUpdate'; // ✅ import the hook

export default function SplashScreen({ navigation }) {
  const { UpdatePrompt, checking } = useInAppUpdate({
    updateType: 'flexible', // or 'immediate' if you want force update
    checkOnMount: true,
  });

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        // Wait a bit for logo visibility
        setTimeout(() => {
          if (token) {
            navigation.replace('Main'); // ✅ already logged in
          } else {
            navigation.replace('Auth'); // ❌ show onboarding/login
          }
        }, 2000);
      } catch (err) {
        console.error('Auto-login error:', err);
        navigation.replace('Onboarding'); // fallback on error
      }
    };

    // ⛔ only navigate if no update prompt is shown
    if (!checking) checkLoginStatus();
  }, [checking]);

  const logoimg = resolveAssetSource(require('../images/logo.jpg'));

  return (
    <View style={styles.container}>
      <Image source={logoimg} style={{ width: 350, height: 120 }} />
      {checking && (
        <ActivityIndicator size="large" color="#006B3D" style={{ marginTop: 20 }} />
      )}

      {/* ✅ render update prompt modal if needed */}
      <UpdatePrompt />
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
