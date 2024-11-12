import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { featured } from '../constants';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../Slices/RestaurantSlice';

const CartScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant)

  return (
    <View style={styles.container}>
      {/* Back button section */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon.ArrowLeft stroke="white" strokeWidth={3} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Your Cart</Text>
          <Text style={styles.subHeaderText}>{restaurant.name}</Text>
        </View>
      </View>

      {/* Delivery info section */}
      <View style={styles.deliveryInfo}>
        <Image
          style={styles.deliveryImage}
          source={require('../Assets/images/BikeGuy.png')}
        />
        <Text style={styles.deliveryText}>Delivery in 20 - 30 minutes</Text>
        <TouchableOpacity>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Dishes section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContent}
      >
        {restaurant.dishes.map((dish, index) => (
          <View style={styles.dishContainer} key={index}>
            <Text style={styles.dishQuantity}>2 x</Text>
            <Image style={styles.dishImage} source={dish.image} />
            <Text style={styles.dishName}>{dish.name}</Text>
            <Text style={styles.dishPrice}>${dish.price}</Text>
            <TouchableOpacity style={styles.iconButton}>
              <Icon.Minus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Total section */}
      <View style={styles.totalContainer}>
        <View style={styles.totalRow}>
          <Text>Subtotal</Text>
          <Text>$6</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>Delivery Fee</Text>
          <Text>$14</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Order Total</Text>
          <Text style={styles.totalText}>$20</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderButton}
        onPress={()=>navigation.navigate('OrderPreparing')}>
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
    backgroundColor: 'white',
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
    color: 'black',
    textAlign: 'center',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fcd4b8',
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
    color: '#333',
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
    backgroundColor: 'white',
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
    color: '#333',
  },
  dishPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingLeft: 8,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#f97316',
    marginHorizontal: 10,
  },
  totalContainer: {
    padding: 12,
    backgroundColor: '#fcd4b8',
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
});
