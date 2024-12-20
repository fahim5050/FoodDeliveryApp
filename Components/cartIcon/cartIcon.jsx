// CartIcon.js
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux'; // Import the useSelector hook
import * as Icon from 'react-native-feather';

const CartIcon = ({onPress}) => {
  // Fetch the total quantity from the Redux store
  const cartCount = useSelector(state => state.cart.items.length);
  const darkMode = useSelector(state => state.theme.darkMode); // Get dark mode state from Redux

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.iconWrapper,
        darkMode ? styles.cartIconDark : styles.cartIconLight,
      ]}>
      <Icon.ShoppingCart
        stroke={darkMode ? '#000' : '#fff'}
        width={25}
        height={25}
      />
      {cartCount > 0 && (
        <View
          style={[
            styles.badge,
            darkMode ? styles.badgeDark : styles.badgeLight,
          ]}>
          <Text
            style={[
              styles.badgeText,
              darkMode ? styles.badgeTextDark : styles.badgeTextLight,
            ]}>
            {cartCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
    padding: 5,
  },
  cartIconLight: {
    marginLeft: 20,
    backgroundColor: '#f97316',
    borderRadius: 100,
    padding: 6,
  },
  cartIconDark: {
    marginLeft: 20,
    backgroundColor: 'transparent', // Remove the background for dark mode
    padding: 6,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeLight: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeDark: {
    backgroundColor: '#fff', // Dark background for badge in dark mode
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  badgeTextLight: {
    color: '#f97316', // Light mode badge text color
  },
  badgeTextDark: {
    color: '#f97316', // Dark mode badge text color
  },
});

export default CartIcon;
