import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import { useSelector } from 'react-redux';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const darkMode = useSelector(state => state.theme.darkMode);

  const [formData, setFormData] = useState({
    name: 'Fahim ud din',
    email: 'fahimsiraj5050@gmail.com',
    location: 'Peshawar, Pakistan',
    phone: '+1 234 567 890',
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = () => {
    console.log('Updated Profile Data:', formData);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <Text style={[styles.header, darkMode && styles.headerDark]}>Edit Profile</Text>
        {/* Invisible placeholder for centering */}
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, darkMode && styles.labelDark]}>Name</Text>
          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, darkMode && styles.labelDark]}>Email</Text>
          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
          />
        </View>

        {/* Location Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, darkMode && styles.labelDark]}>Location</Text>
          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
          />
        </View>

        {/* Phone Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, darkMode && styles.labelDark]}>Phone</Text>
          <TextInput
            style={[styles.input, darkMode && styles.inputDark]}
            value={formData.phone}
            keyboardType="phone-pad"
            onChangeText={(value) => handleInputChange('phone', value)}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={[styles.saveButton, darkMode && styles.saveButtonDark]} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 15,
    paddingHorizontal: 15,
  },
  containerDark: {
    backgroundColor: '#121212',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#f97316',
    padding: 8,
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerDark: {
    color: 'white',
  },
  placeholder: {
    width: 40, // Matches the size of the back button for proper centering
  },
  scrollContent: {
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
  labelDark: {
    color: '#b0b0b0',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f8f8f8',
  },
  inputDark: {
    backgroundColor: '#333333',
    borderColor: '#444444',
    color: 'white',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonDark: {
    backgroundColor: '#1e7e34',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
