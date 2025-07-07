import React from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'; // ✅ required

const onboardingImage = resolveAssetSource(require('../images/onboarding.asset.jpg')); // ✅ disable autolinking

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Image
        source={onboardingImage}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>All your favorite foods</Text>
      <Text style={styles.subtitle}>Fresh meat and fish, delivered fast at your doorstep.</Text>
      <Button
        mode="contained"
        onPress={() => navigation.replace('Auth')}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    width: '80%',
    borderRadius: 30,
    backgroundColor: '#43a047',
    paddingVertical: 8,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
