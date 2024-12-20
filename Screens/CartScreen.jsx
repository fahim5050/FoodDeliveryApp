import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart } from '../redux/CartSlice';

const CartScreen = () => {
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/FoodImages/';
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Calculate totals
  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotal = () => {
    return getSubtotal() + 14; // Assuming $14 for the delivery fee
  };

  const dynamicStyles = darkMode ? styles.dark : styles.light;

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon.ArrowLeft stroke={dynamicStyles.iconColor} strokeWidth={3} />
        </TouchableOpacity>
        <Text style={[styles.headerText, dynamicStyles.headerText]}>Your Cart</Text>
      </View>

      {/* Delivery Info */}
      <View style={[styles.deliveryInfo, dynamicStyles.deliveryInfo]}>
        <Image
          style={styles.deliveryImage}
          source={require('../Assets/images/BikeGuy.png')}
        />
        <Text style={[styles.deliveryText, dynamicStyles.deliveryText]}>
          Delivery in 20 - 30 minutes
        </Text>
        <TouchableOpacity>
          <Text style={[styles.changeText, dynamicStyles.changeText]}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}>
        {cartItems.length > 0 ? (
          cartItems.map((dish, index) => (
            <View style={[styles.dishContainer, dynamicStyles.dishContainer]} key={index}>
              <Text style={[styles.dishQuantity, dynamicStyles.dishQuantity]}>
                {dish.quantity} x
              </Text>
              <Image
                style={styles.dishImage}
                source={{ uri: `${BASE_IMAGE_URL}${dish.foodImageName}` }}
              />
              <Text style={[styles.dishName, dynamicStyles.dishName]}>
                {dish.foodName}
              </Text>
              <Text style={[styles.dishVariant, dynamicStyles.dishVariant]}>
                {dish.variant}
              </Text>
              <Text style={[styles.dishPrice, dynamicStyles.dishPrice]}>
              Rs{dish.price}
              </Text>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => dispatch(removeFromCart(dish.foodId))}
              >
                <Icon.Minus
                  strokeWidth={2}
                  height={20}
                  width={20}
                  stroke={dynamicStyles.iconColor}
                />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={[styles.emptyCartText, dynamicStyles.emptyCartText]}>
            Your cart is empty
          </Text>
        )}
      </ScrollView>

      {/* Clear Cart or Go for Ordering */}
      {cartItems.length > 0 ? (
        <Text
          style={[styles.clearCartText, dynamicStyles.clearCartText]}
          onPress={() => dispatch(clearCart())}>
          Clear Cart
        </Text>
      ) : (
        <Text
          style={[styles.goForOrderingText, dynamicStyles.goForOrderingText]}
          onPress={() => navigation.navigate('Home')}>
          Go for Ordering
        </Text>
      )}

      {/* Total */}
      <View style={[styles.totalContainer, dynamicStyles.totalContainer]}>
        <View style={styles.totalRow}>
          <Text style={dynamicStyles.totalText}>Subtotal</Text>
          <Text style={dynamicStyles.totalText}>Rs{getSubtotal()}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={dynamicStyles.totalText}>Delivery Fee</Text>
          <Text style={dynamicStyles.totalText}>Rs14</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={[styles.totalText, dynamicStyles.totalText]}>Order Total</Text>
          <Text style={[styles.totalText, dynamicStyles.totalText]}>
          Rs{getTotal()}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.placeOrderButton}
          onPress={() => navigation.navigate('OrderPreparing')}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    padding: 6,
    borderRadius: 100,
    backgroundColor: '#f97316',
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#fac6a2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  deliveryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  deliveryText: {
    flex: 1,
    paddingLeft: 12,
    fontSize: 16,
  },
  changeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316',
  },
  scrollViewContent: {
    paddingBottom: 50,
    paddingTop: 5,
  },
  dishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 6,
    marginHorizontal: 10,
    shadowColor: '#fac6a2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  dishQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316',
  },
  dishImage: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginLeft: 10,
  },
  dishName: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 8,
  },
  clearCartText: {
    textAlign: 'center',
    color: 'red',
    marginBottom: 5,
  },
  goForOrderingText: {
    textAlign: 'center',
    color: '#f97316',
    marginBottom: 5,
  },
  dishVariant: {
    color: 'gray',
    flex: 1,
    paddingLeft: 10,
    fontSize: 13,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#f97316',
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 12,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  totalText: {
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: '#f97316',
    borderRadius: 40,
    paddingVertical: 10,
    marginTop: 10,
  },
  placeOrderText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
  },

  // Dark Mode Styles
  dark: {
    container: {
      backgroundColor: '#121212',
    },
    headerText: {
      color: 'white',
    },
    deliveryInfo: {
      backgroundColor: '#2a2a2a',
    },
    deliveryText: {
      color: 'white',
    },
    changeText: {
      color: '#f97316',
    },
    dishContainer: {
      backgroundColor: '#1f1f1f',
    },
    dishQuantity: {
      color: '#f97316',
    },
    dishName: {
      color: 'white',
    },
    dishVariant: {
      color: '#aaaaaa',
    },
    dishPrice: {
      color: 'white',
    },
    clearCartText: {
      color: 'white',
    },
    goForOrderingText: {
      color: '#f97316',
    },
    totalContainer: {
      backgroundColor: '#2a2a2a',
    },
    totalText: {
      color: 'white',
    },
    iconColor: 'white',
    emptyCartText:{
      color:'gray'
    },
  },

  // Light Mode Styles
  light: {
    container: {
      backgroundColor: 'white',
    },
    headerText: {
      color: 'black',
    },
    deliveryInfo: {
      backgroundColor: '#fcd4b8',
    },
    deliveryText: {
      color: '#333',
    },
    changeText: {
      color: '#f97316',
    },
    dishContainer: {
      backgroundColor: 'white',
    },
    dishQuantity: {
      color: '#f97316',
    },
    dishName: {
      color: '#333',
    },
    dishVariant: {
      color: 'gray',
    },
    dishPrice: {
      color: '#333',
    },
    clearCartText: {
      color: 'red',
    },
    goForOrderingText: {
      color: '#f97316',
    },
    totalContainer: {
      backgroundColor: '#fcd4b8',
    },
    totalText: {
      color: '#333',
    },
    iconColor: 'white',
  },
});
