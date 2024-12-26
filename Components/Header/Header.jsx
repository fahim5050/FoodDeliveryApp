import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import NotificationIcon from '../../Components/Notification/Notification';
import CartIcon from '../cartIcon/cartIcon';
import * as Icon from 'react-native-feather';
import { toggleTheme } from '../../redux/ThemeSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = ({
  userName = 'Fahim ud din',
  userImage,
  notificationCount = 4,
  cartCount,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(state => state.theme.darkMode);

  const onToggleTheme = () => {
    dispatch(toggleTheme());
  };

  // Dynamic Styles
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.headerContainer, dynamicStyles.headerContainer]}>
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
        <Text style={[styles.greeting, dynamicStyles.greeting]}>
          Hi, {userName}
        </Text>
      </TouchableOpacity>

      {/* Icons Section */}
      <View style={styles.iconsContainer}>
        {/* Sun/Moon Toggle Icon */}
        <TouchableOpacity onPress={onToggleTheme} style={styles.iconButton}>
          {isDarkMode ? (
            <Icon.Moon stroke={dynamicStyles ? '#000' : '#fff'}
            width={25}
            height={25} />
          ) : (
            <Icon.Sun stroke={dynamicStyles ? '#fff' : '#000'}
            width={25}
            height={25} />
          )}
        </TouchableOpacity>

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

const lightTheme = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#f97316', // Orange color for light mode
  },
  greeting: {
    color: '#fff', // White text for light mode
  },
});

const darkTheme = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#333', // Dark gray for dark mode
  },
  greeting: {
    color: '#f97316', // Orange text for dark mode
  },
});

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
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
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 15,
  },
});

export default Header;
