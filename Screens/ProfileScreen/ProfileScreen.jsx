import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import * as Icon from 'react-native-feather';

// Dummy data
const userData = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  location: 'New York, USA',
  phone: '+1 234 567 890',
  joinedDate: 'January 1, 2023'
};

// ProfileScreen component
const ProfileScreen = () => {
  const navigation = useNavigation();
  const profileImage = require('../../Assets/images/DeliveryBoy.gif'); // Local image

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon.ArrowLeft strokeWidth={3} stroke="white" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Image */}
        <Image source={profileImage} style={styles.profileImage} />

        {/* User Information */}
        <Text style={styles.userName}>{userData.name}</Text>
        <Text style={styles.userEmail}>{userData.email}</Text>

        {/* Additional Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon.MapPin stroke="gray" width={20} height={20} />
            <Text style={styles.infoText}>{userData.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon.Phone stroke="gray" width={20} height={20} />
            <Text style={styles.infoText}>{userData.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon.Calendar stroke="gray" width={20} height={20} />
            <Text style={styles.infoText}>Joined: {userData.joinedDate}</Text>
          </View>
        </View>

        {/* Edit Profile Button */}
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.buttonText}>Logout</Text>
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
  userEmail: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fcd4b8',
    borderRadius: 10,
    marginBottom: 20,
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
  editButton: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#28a745', // Fresh green for Edit button
    alignItems: 'center',
    marginVertical: 5,
  },
  logoutButton: {
    width: '90%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#2c3e50', // Dark slate gray for Logout button
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
