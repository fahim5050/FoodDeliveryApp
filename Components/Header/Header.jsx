// Header.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationIcon from '../../Components/Notification/Notification'; // Import the NotificationIcon component
import CartIcon from '../cartIcon/cartIcon';
 // Import the CartIcon component

const Header = ({ userName = 'Thomas', userImage, notificationCount = 4, cartCount = 3 }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.headerContainer}>
      {/* User Profile Section */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={styles.userInfo}>
        <Image
          source={
            userImage
              ? { uri: userImage }
              : require('../../Assets/images/DeliveryBoy.gif')
          }
          style={styles.profileImage}
        />
        <Text style={styles.greeting}>Hi, {userName}</Text>
      </TouchableOpacity>

      {/* Icons Section */}
      <View style={styles.iconsContainer}>
        {/* Notification Icon */}
        <NotificationIcon
          notificationCount={notificationCount}
          onPress={() => navigation.navigate('Notifications')}
        />

        {/* Cart Icon */}
        <CartIcon
          cartCount={cartCount}
          onPress={() => navigation.navigate('Cart')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f97316',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
