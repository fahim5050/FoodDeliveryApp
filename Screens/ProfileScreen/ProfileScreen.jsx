import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as Icon from 'react-native-feather';
import { useSelector } from 'react-redux';

// Dummy data
const userData = {
  name: 'Fahim ud din ',
  email: 'fahimsiraj5050@gmail.com',
  location: 'peshawar pakistan',
  phone: '+1 234 567 890',
  joinedDate: 'January 1, 2023'
};

// ProfileScreen component
const ProfileScreen = () => {
  const navigation = useNavigation();
  const profileImage = require('../../Assets/images/DeliveryBoy.gif'); // Local image
  const darkMode = useSelector(state => state.theme.darkMode);


  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon.ArrowLeft strokeWidth={3} stroke= "white"/>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image */}
        <Image source={profileImage} style={styles.profileImage} />

        {/* User Information */}
        <Text style={[styles.userName, darkMode && styles.userNameDark]}>{userData.name}</Text>
        <Text style={[styles.userEmail, darkMode && styles.userEmailDark]}>{userData.email}</Text>

        {/* Additional Info */}
        <View style={[styles.infoContainer, darkMode && styles.infoContainerDark]}>
          <View style={styles.infoRow}>
            <Icon.MapPin stroke={darkMode ? "white" : "gray"} width={20} height={20} />
            <Text style={[styles.infoText, darkMode && styles.infoTextDark]}>{userData.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon.Phone stroke={darkMode ? "white" : "gray"} width={20} height={20} />
            <Text style={[styles.infoText, darkMode && styles.infoTextDark]}>{userData.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon.Calendar stroke={darkMode ? "white" : "gray"} width={20} height={20} />
            <Text style={[styles.infoText, darkMode && styles.infoTextDark]}>Joined: {userData.joinedDate}</Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity
  onPress={() => {
    
      navigation.navigate('EditProfile'); // Ensures navigation happens after the render
  }}
  style={[styles.editButton, darkMode && styles.editButtonDark]}
>
  <Text style={styles.buttonText}>Edit Profile</Text>
</TouchableOpacity>


        {/* Logout Button */}
        <TouchableOpacity style={[styles.logoutButton, darkMode && styles.logoutButtonDark]}>
          <Text style={styles.buttonText} >Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

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
  backButton: {
    backgroundColor: '#f97316',
    padding: 8,
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginTop: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  userNameDark: {
    color: 'white',
  },
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  userEmailDark: {
    color: '#b0b0b0',
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fcd4b8',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainerDark: {
    backgroundColor: '#333333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  infoTextDark: {
    color: 'white',
  },
  editButton: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#28a745', // Fresh green for Edit button
    alignItems: 'center',
    marginVertical: 5,
  },
  editButtonDark: {
    backgroundColor: '#1e7e34', // Darker green for dark mode
  },
  logoutButton: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2c3e50', // Dark slate gray for Logout button
    alignItems: 'center',
    marginVertical: 5,
  },
  logoutButtonDark: {
    backgroundColor: '#34495e', // Slightly darker slate for dark mode
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
