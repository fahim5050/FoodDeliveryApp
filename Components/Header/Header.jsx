import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import * as Icon from 'react-native-feather';

const Header = ({userName = 'Thomas', userImage, onCartPress}) => {
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
              ? {uri: userImage}
              : require('../../Assets/images/DeliveryBoy.gif')
          }
          style={styles.profileImage}
        />
        <Text style={styles.greeting}>Hi, {userName}</Text>
      </TouchableOpacity>

      {/* Icons Section */}
      <View style={styles.iconsContainer}>
        {/* Notification Icon */}
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Icon.Bell stroke="white" width={25} height={25} />
        </TouchableOpacity>

        {/* Cart Icon */}
        <TouchableOpacity onPress={onCartPress} style={styles.cartIcon}>
          <Icon.ShoppingCart stroke="white" width={25} height={25} />
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
    padding: 15,
    backgroundColor: '#f97316',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    marginBottom: 5,
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
    color: '#fff', // Optional: Adjust color for better readability
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartIcon: {
    marginLeft: 20,
  },
});

export default Header;
