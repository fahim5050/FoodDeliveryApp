import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import * as Icon from 'react-native-feather';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/CartSlice';

const SubDishes = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { subDishes, dishName, dishImage } = route.params;
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/FoodImages/';

  // State for managing modal visibility and selected item
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [counter, setCounter] = useState(1);  // Counter for item quantity

  const handleAddToCart = (item) => {
    const itemToAdd = { ...item, quantity: counter };
    dispatch(addToCart(itemToAdd));
    alert(`${item.foodName} has been added to your cart!`);
    setModalVisible(false); // Close modal after adding to cart
  };


  const handleCounterChange = (operation) => {
    if (operation === 'increment') {
      setCounter(prev => prev + 1);
    } else if (operation === 'decrement' && counter > 1) {
      setCounter(prev => prev - 1);
    }
  };

  const handleModal = (item) => {
    setSelectedItem(item); // Set selected item
    setModalVisible(true); // Open modal
  };
  console.log(subDishes.map(item => item.foodId));

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={
            dishImage
              ? { uri: `${BASE_IMAGE_URL}${dishImage}` }
              : require('../../Assets/restaurants/download.jpeg')
          }
          style={styles.mainDishImage}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon.ArrowLeft strokeWidth={3} stroke="#f97316" />
        </TouchableOpacity>
      </View>
      <View style={styles.subDishesContainer}>
        <Text style={styles.title}>{dishName} - Variants</Text>
        {subDishes.length > 0 ? (
          <FlatList
            data={subDishes}
            keyExtractor={(item) => item.foodId.toString()}

            renderItem={({ item }) => (
              <View style={styles.subDishContainer}>
                <Image
                  style={styles.image}
                  source={
                    item.foodImageName
                      ? { uri: `${BASE_IMAGE_URL}${item.foodImageName}` }
                      : require('../../Assets/dishes/download2.jpeg')
                  }
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.foodName}</Text>
                  <Text style={styles.description}>{item.variant}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
                {/* Add to Cart Button */}
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleModal(item)}>
                  <Text style={styles.addToCartText}>View Details</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <View style={styles.noItemsContainer}>
            <Text style={styles.noItemsText}>
              Sorry, no products available for this category.
            </Text>
          </View>
        )}
      </View>

      {/* Modal for showing subdish details */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Image
                source={
                  selectedItem.imageName
                    ? { uri: `${BASE_IMAGE_URL}${selectedItem.imageName}` }
                    : require('../../Assets/dishes/download2.jpeg')
                }
                style={styles.modalImage}
              />
              <Text style={styles.modalFoodName}>{selectedItem.foodName}</Text>
              <Text style={styles.modalDescription}>{selectedItem.variant}</Text>
              <Text style={styles.modalPrice}>${selectedItem.price}</Text>
              <View style={styles.counterContainer}>
                <TouchableOpacity
                  onPress={() => handleCounterChange('decrement')}
                  style={styles.counterButton}>
                  <Text style={styles.counterText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.counter}>{counter}</Text>
                <TouchableOpacity
                  onPress={() => handleCounterChange('increment')}
                  style={styles.counterButton}>
                  <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.modalAddToCartButton}
                onPress={() => handleAddToCart(selectedItem)}>
                <Icon.ShoppingCart stroke="white" strokeWidth={2} />
                <Text style={styles.modalAddToCartText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
  onPress={() => setModalVisible(false)}
  style={styles.closeModalButton}>
  <Icon.X stroke='white' with={25} height={25} style={styles.closeModalText}/>
</TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  mainDishImage: {
    width: '100%',
    height: 200,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 50,
  },
  subDishesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  subDishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 2,
    marginBottom: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 6,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316',
  },
  addToCartButton: {
    backgroundColor: '#f97316', // Orange background
    borderRadius: 50,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addToCartText:{
color:'white'
  },
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  noItemsText: {
    color: 'red',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
  },

  // Modal Styles
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalFoodName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 16,
    color: '#777',
    marginBottom: 8,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f97316',
    marginBottom: 16,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  counterButton: {
    backgroundColor: '#f97316',
    borderRadius: 50,
    padding: 10,
    width:50,
    height:50,
    alignItems:'center',
    marginHorizontal: 10,
  },
  counterText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  counter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modalAddToCartButton: {
    backgroundColor: '#f97316',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalAddToCartText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#f97316', // Transparent background
    padding: 8,
    borderRadius: 50, // Rounded button
  },
  
});

export default SubDishes;
