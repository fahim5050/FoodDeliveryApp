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
  const darkMode = useSelector(state => state.theme.darkMode);

  // Static rider data
  const riderData = {
    name: 'John Doe',
    contact: '123-456-7890',
    vehicle: 'Motorbike',
    deliveryStatus: 'On the way',
    estimatedTime: '30 mins', // Estimated delivery time
  };

  return (
    <View style={[styles.container, darkMode ? styles.darkContainer : styles.lightContainer]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.backButton}>
        <Icon.ArrowLeft strokeWidth={3} stroke= '#fff' />
      </TouchableOpacity>

      {/* Rider Information Section */}
      <View style={[styles.riderContainer, darkMode ? styles.darkRiderContainer : styles.lightRiderContainer]}>
        <Text style={[styles.riderHeader, darkMode ? styles.darkText : styles.lightText]}>
          Rider Information
        </Text>
        <Text style={[styles.riderText, darkMode ? styles.darkText : styles.lightText]}>
          Name: {riderData.name}
        </Text>
        <Text style={[styles.riderText, darkMode ? styles.darkText : styles.lightText]}>
          Contact: {riderData.contact}
        </Text>
        <Text style={[styles.riderText, darkMode ? styles.darkText : styles.lightText]}>
          Vehicle: {riderData.vehicle}
        </Text>
        <Text style={[styles.riderText, darkMode ? styles.darkText : styles.lightText]}>
          Status: {riderData.deliveryStatus}
        </Text>
      </View>

      {/* <Text style={[styles.estimateTime, darkMode ? styles.darkText : styles.estimatedTime]}>
        Estimated Time: {riderData.estimatedTime}
      </Text> */}

      <Text style={[styles.header, darkMode ? styles.darkText : styles.lightText]}>Order Summary</Text>

      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.foodId.toString()}
        renderItem={({item}) => (
          <View style={[styles.itemContainer, darkMode ? styles.darkItemContainer : styles.lightItemContainer]}>
            <Image
              source={{
                uri: `https://pos7.paktech24.com/images/FoodImages//${item.foodImageName}`,
              }}
              style={styles.itemImage}
            />
            <View style={styles.itemDetails}>
              <Text style={[styles.itemName, darkMode ? styles.darkText : styles.lightText]}>
                {item.foodName}
              </Text>
              <Text style={[styles.itemVariant, darkMode ? styles.darkText : styles.lightText]}>
                Variant: {item.variant}
              </Text>
              <View style={styles.quantityPriceContainer}>
                <Text style={[styles.itemQuantity, darkMode ? styles.darkText : styles.lightText]}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={[styles.itemPrice, darkMode ? styles.darkText : styles.lightText]}>
                  Price: Rs{item.price}
                </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={[styles.summaryContainer, darkMode ? styles.darkSummaryContainer : styles.lightSummaryContainer]}>
        <Text style={[styles.summaryText, darkMode ? styles.darkText : styles.lightText]}>
          Total Items: {totalQuantity}
        </Text>
        <Text style={[styles.summaryText, darkMode ? styles.darkText : styles.lightText]}>
          Total Price: Rs{totalPrice}
        </Text>
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
    padding: 16,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
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
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  lightItemContainer: {
    backgroundColor: '#f9f9f9',
  },
  darkItemContainer: {
    backgroundColor: '#333',
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
    borderRadius: 8,
  },
  lightSummaryContainer: {
    backgroundColor: '#fcd4b8',
  },
  darkSummaryContainer: {
    backgroundColor: '#444',
  },
  summaryText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  riderContainer: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 8,
  },
  lightRiderContainer: {
    backgroundColor: '#fcd4b8',
  },
  darkRiderContainer: {
    backgroundColor: '#444',
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
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: 'gray',
  },
  estimatedTime:{
    color:'000'
  }
});
