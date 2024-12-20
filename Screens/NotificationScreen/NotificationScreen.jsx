import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native'; // Import the navigation hook
import { useSelector } from 'react-redux';

const notifications = [
  {
    id: 1,
    title: 'Order Confirmed',
    message: 'Your order has been confirmed and is being prepared.',
    time: '2 minutes ago',
    icon: Icon.CheckCircle,
    color: 'green', // Example color
  },
  {
    id: 2,
    title: 'Out for Delivery',
    message: 'Your food is out for delivery and will arrive soon.',
    time: '20 minutes ago',
    icon: Icon.Truck,
    color: 'orange', // Example color
  },
  {
    id: 3,
    title: 'Order Delivered',
    message: 'Your order has been delivered successfully. Enjoy your meal!',
    time: '1 hour ago',
    icon: Icon.Package,
    color: 'blue', // Example color
  },
  {
    id: 4,
    title: 'Order Cancelled',
    message: 'Unfortunately, your order has been cancelled. Please try again later.',
    time: '3 hours ago',
    icon: Icon.XCircle,
    color: 'red', // Example color
  },
];

const NotificationScreen = () => {
  const navigation = useNavigation(); // Use the navigation hook
  const darkMode = useSelector(state => state.theme.darkMode);

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header: Back Button and Title */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon.ArrowLeft strokeWidth={3} stroke="white" />
          </TouchableOpacity>
          <Text style={[styles.title, darkMode && styles.darkTitle]}>Notifications</Text>
        </View>

        {/* Notification List */}
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={[styles.notificationContainer, darkMode && styles.darkNotificationContainer]}>
            <View style={styles.notificationIcon}>
              {/* Use the icon directly */}
              <notification.icon stroke={notification.color} width={24} height={24} />
            </View>
            <View style={styles.notificationText}>
              <Text style={[styles.notificationTitle, darkMode && styles.darkNotificationTitle]}>{notification.title}</Text>
              <Text style={[styles.notificationMessage, darkMode && styles.darkNotificationMessage]}>{notification.message}</Text>
              <Text style={[styles.notificationTime, darkMode && styles.darkNotificationTime]}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
  },
  darkContainer: {
    backgroundColor: '#111', // Dark background
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Keep the back button at the left
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#f97316',
    padding: 8,
    borderRadius: 50,
    marginRight: 10, // Space between icon and title
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1, // Make the title take the remaining space
    textAlign: 'center', // Center the title horizontally
    marginRight: 30,
    color: 'black',
  },
  darkTitle: {
    color: 'white', // White title for dark mode
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 5,
  },
  darkNotificationContainer: {
    backgroundColor: '#444', // Dark background for notification container
    borderBottomColor: '#555',
  },
  notificationIcon: {
    marginRight: 15,
  },
  notificationText: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  darkNotificationTitle: {
    color: 'white', // White text for title in dark mode
  },
  notificationMessage: {
    fontSize: 14,
    color: 'gray',
  },
  darkNotificationMessage: {
    color: '#bbb', // Light gray for message in dark mode
  },
  notificationTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  darkNotificationTime: {
    color: '#ccc', // Lighter gray for time in dark mode
  },
});
