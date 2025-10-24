import React, { useState, useCallback } from 'react';
import {
  Text, View, Image, TouchableOpacity, ScrollView, Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/ProfileStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '@env';

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [guestMode, setGuestMode] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchUser = async () => {
        const guest = await AsyncStorage.getItem('guestMode');
        if (guest === 'true') {
          setGuestMode(true);
          setUserName('Guest User');
          setUserPhone('Login to continue');
          return;
        }

        const token = await AsyncStorage.getItem('userToken');

        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUserName(data.name);
          setUserPhone(data.phone);
        }
      };
      fetchUser();
    }, [])
  );

  const ProfileItem = ({ icon, label, onPress, iconColor = '#000000ff' }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color={iconColor} />
      <Text style={styles.itemText}>{label}</Text>
      <Ionicons name="chevron-forward" size={20} color="#aaa" style={{ marginLeft: 'auto' }} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.profileHeader}>
        <Image
          source={{ uri: 'https://www.gravatar.com/avatar/?d=mp&s=150' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userPhone}>{userPhone}</Text>
        </View>
      </View>

      {/* Account Section */}
      {!guestMode ? (
        <>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <ProfileItem label="Edit Profile" icon="person" onPress={() => navigation.navigate('EditProfile')} />
            <ProfileItem label="My Addresses" icon="location-on" onPress={() => navigation.navigate('MyAddress')} />
          </View>
            {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <ProfileItem label="Help Center" icon="help-outline" />
        <ProfileItem label="About Us" icon="info-outline" />
        <ProfileItem label="Contact Us" icon="contact-mail" />
      </View>
          <View style={styles.section}>
            <ProfileItem
              label="Logout"
              icon="logout"
              iconColor="red"
              onPress={async () => {
                await AsyncStorage.multiRemove(['token', 'guestMode']);
                navigation.replace('Auth');
              }}
            />
          </View>
        </>
      ) : (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ color: '#888', marginBottom: 10 }}>
            You’re currently in guest mode.
          </Text>
          <TouchableOpacity
            onPress={() => navigation.replace('Auth')}
            style={{ backgroundColor: '#18A558', padding: 10, borderRadius: 8 }}
          >
            <Text style={{ color: '#fff', fontWeight: '600' }}>Login </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}
