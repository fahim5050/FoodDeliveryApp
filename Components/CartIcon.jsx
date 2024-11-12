import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
// import {useSelector} from 'react-redux';
// import { selectCartItemsById } from '../Slices/CartSlice';


const CartIcon = () => {
  const navigation = useNavigation();
//   const totalItems=useSelector(state=>selectCartItemsById(state,item.id));
//   const cartItems = useSelector((state) => state.cart?.items || []);
// if (!cartItems.length ) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartButton}>
        <View style={styles.cartCount}>
          <Text style={styles.cartCountText}>7</Text>
        </View>
        <Text style={styles.cartText}>View Cart</Text>
        <Text style={styles.cartText}>${23}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartIcon;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    bottom: 5,
    zIndex: 50,
  },
  cartButton: {
    backgroundColor: '#f97316',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartCount: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  cartCountText: {
    fontWeight: 'bold',
    color: 'white',
  },
  cartText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
});
