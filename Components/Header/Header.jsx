import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icon from 'react-native-feather';

const Header = ({ userName = 'Thomas', userImage, notificationCount = 4, cartCount = 3,  }) => {
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
        {/* Notification Icon with Badge */}
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconWrapper}>
          <Icon.Bell stroke="white" width={25} height={25} />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Cart Icon with Badge */}
        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={[styles.iconWrapper, styles.cartIcon]}>
          <Icon.ShoppingCart stroke="white" width={25} height={25} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
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
  iconWrapper: {
    position: 'relative',
    padding: 5,
  },
  cartIcon: {
    marginLeft: 20,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#f97316',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Header;
