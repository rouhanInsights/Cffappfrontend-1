import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '@env'; // Ensure you have the correct path to your .env file
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Platform,
  PermissionsAndroid
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker';
import styles from '../styles/EditProfileStyles';

const BASE_URL =API_BASE_URL;

const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alternateEmail, setAlternateEmail] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES || PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const selectImage = async () => {
    const granted = await requestPermission();
    if (!granted) {
      Alert.alert('Permission required', 'Please allow media access to choose an image.');
      return;
    }

    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Could not select image.');
        return;
      }

      const asset = response.assets?.[0];
      if (!asset) return;

      setProfileImage(asset.uri);
      setImageFile({
        uri: asset.uri,
        name: asset.fileName || `profile_${Date.now()}.jpg`,
        type: asset.type || 'image/jpeg',
      });
    });
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return Alert.alert('Error', 'Not authenticated');

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('alt_email', alternateEmail);
      formData.append('gender', gender);
      formData.append('dob', dob);
      if (imageFile) {
        formData.append('profile_image', imageFile);
      }

      const response = await fetch(`${BASE_URL}/api/users/profile`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Profile updated successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', data.error || 'Failed to update profile');
      }
    } catch (err) {
      console.error('Update Profile Error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const res = await fetch(`${BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setName(data.name || '');
          setEmail(data.email || '');
          setPhone(data.phone || '');
          setAlternateEmail(data.alt_email || '');
          setGender(data.gender || '');
          setDob(data.dob ? getLocalDateString(new Date(data.dob)) : '');
          setProfileImage(data.profile_image_url || '');
        }
      } catch (err) {
        console.error('Fetch Profile Error:', err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <ScrollView 
    style={{ flex: 1, backgroundColor: "#000" }}
    contentContainerStyle={styles.container}>
      <View style={styles.profileImageWrapper}>
        <Image
          source={{ uri: profileImage || 'https://www.gravatar.com/avatar/?d=mp&s=150' }}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={selectImage} style={styles.imagePickerButton}>
          {/* <Text style={styles.imagePickerText}>Choose Image</Text> */}
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput value={name} onChangeText={setName} style={styles.input} placeholder="Enter name" />

      <Text style={styles.label}>Email</Text>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Enter email" keyboardType="email-address" />

      <Text style={styles.label}>Phone</Text>
      <TextInput value={phone} onChangeText={setPhone} style={styles.input} placeholder="Enter phone" keyboardType="phone-pad" />

      <Text style={styles.label}>Alternate Email</Text>
<TextInput
  value={alternateEmail}
  onChangeText={setAlternateEmail}
  style={styles.input}
  placeholder="Enter alternate email"
  placeholderTextColor="#a8a8a8ff"   // ✅ white placeholder
  keyboardType="email-address"
/>

      <Text style={styles.label}>Gender</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={gender}
          onValueChange={(value) => setGender(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      <Text style={styles.label}>Date of Birth</Text>
<TouchableOpacity
  onPress={() => setShowDatePicker(true)}
  style={styles.input}
>
  <Text style={{ color: dob ? "#ada8a8ff" : "#fff" }}>
    {dob || "Select DOB"}   {/* ✅ placeholder in white */}
  </Text>
</TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob ? new Date(dob) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setDob(getLocalDateString(selectedDate));
            }
          }}
        />
      )}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
