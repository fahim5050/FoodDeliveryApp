import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux'; // Import useSelector to get data from Redux store
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';
const OrderDelivery = () => {
  const navigation = useNavigation();
  // Access the cart data from the Redux store using useSelector
  const {items, totalPrice, totalQuantity} = useSelector(state => state.cart);

  // Static rider data
  const riderData = {
    name: 'John Doe',
    contact: '123-456-7890',
    vehicle: 'Motorbike',
    deliveryStatus: 'On the way',
    estimatedTime: '30 mins', // Estimated delivery time
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.backButton}>
        <Icon.ArrowLeft strokeWidth={3} stroke="#fff" />
      </TouchableOpacity>
      {/* Rider Information Section */}
      <View style={styles.riderContainer}>
        <Text style={styles.riderHeader}>Rider Information</Text>
        <Text style={styles.riderText}>Name: {riderData.name}</Text>
        <Text style={styles.riderText}>Contact: {riderData.contact}</Text>
        <Text style={styles.riderText}>Vehicle: {riderData.vehicle}</Text>
        <Text style={styles.riderText}>Status: {riderData.deliveryStatus}</Text>
      </View>
      <Text style={styles.estimateTime}>
        Estimated Time: {riderData.estimatedTime}
      </Text>

      <Text style={styles.header}>Order Summary</Text>

      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.foodId.toString()}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image
              source={{
                uri: `https://pos7.paktech24.com/images/FoodImages//${item.foodImageName}`,
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.foodName}</Text>
              <Text style={styles.itemVariant}>Variant: {item.variant}</Text>
              <View style={styles.quantityPriceContainer}>
                <Text style={styles.itemQuantity}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={styles.itemPrice}>Price: ${item.price}</Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total Items: {totalQuantity}</Text>
        <Text style={styles.summaryText}>Total Price: ${totalPrice}</Text>
      </View>

      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>Confirm Order</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDelivery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  backButton: {
    width: 35,
    backgroundColor: '#f97316',
    padding: 5,
    borderRadius: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemVariant: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  quantityPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  itemQuantity: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
    color: '#f97316',
  },
  summaryContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fcd4b8',
    borderRadius: 8,
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  riderContainer: {
    marginVertical: 10, // Add spacing between the rider info and the rest of the content
    padding: 10,
    backgroundColor: '#fcd4b8',
    borderRadius: 8,
  },
  riderHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  riderText: {
    fontSize: 16,
    marginBottom: 6,
  },
  estimateTime: {
    fontSize: 16,
    marginBottom: 6,
    backgroundColor: '#f97316',
    color: '#fff',
    textAlign: 'center',
    padding: 5,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: '#22c55e',
    padding: 12,
    borderRadius: 8,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
