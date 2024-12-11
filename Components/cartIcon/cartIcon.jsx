// CartIcon.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux'; // Import the useSelector hook
import * as Icon from 'react-native-feather';

const CartIcon = ({ onPress }) => {
  // Fetch the total quantity from the Redux store
  const cartCount = useSelector((state) => state.cart.items.length);

  return (
    <TouchableOpacity onPress={onPress} style={[styles.iconWrapper, styles.cartIcon]}>
      <Icon.ShoppingCart stroke="white" width={25} height={25} />
      {cartCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{cartCount}</Text>
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
  cartIcon: {
    marginLeft: 20,
    backgroundColor:'#f97316',
    borderRadius:100,
    padding:6,
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

export default CartIcon;
