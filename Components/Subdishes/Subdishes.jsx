import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import * as Icon from 'react-native-feather';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../redux/CartSlice';
import CartIcon from '../cartIcon/cartIcon';

const SubDishes = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {subDishes, dishName, dishImage} = route.params;
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/FoodImages/';
  const darkMode = useSelector(state => state.theme.darkMode); // Get dark mode state from Redux

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [counter, setCounter] = useState(1);

  const handleAddToCart = item => {
    const itemToAdd = {...item, quantity: counter};
    dispatch(addToCart(itemToAdd));
    alert(`${item.foodName} has been added to your cart!`);
    setModalVisible(false);
  };

  const handleCounterChange = operation => {
    if (operation === 'increment') {
      setCounter(prev => prev + 1);
    } else if (operation === 'decrement' && counter > 1) {
      setCounter(prev => prev - 1);
    }
  };

  const handleModal = item => {
    setSelectedItem(item);
    setCounter(1);
    setModalVisible(true);
  };

  const themeStyles = darkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* Main Content */}
      <View style={styles.imageContainer}>
        <Image
          source={
            dishImage
              ? {uri: `${BASE_IMAGE_URL}${dishImage}`}
              : require('../../Assets/restaurants/download.jpeg')
          }
          style={styles.mainDishImage}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Icon.ArrowLeft strokeWidth={3} stroke="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIconContainer}>
          <CartIcon
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Sub Dish List */}
      <View style={[styles.subDishesContainer, themeStyles.subDishesContainer]}>
        <Text style={[styles.title, themeStyles.title]}>
          {dishName} - Variants
        </Text>
        {subDishes.length > 0 ? (
          <FlatList
            data={subDishes}
            keyExtractor={item => item.foodId.toString()}
            renderItem={({item}) => (
              <View
                style={[styles.subDishContainer, themeStyles.subDishContainer]}>
                <Image
                  style={styles.image}
                  source={
                    item.foodImageName
                      ? {uri: `${BASE_IMAGE_URL}${item.foodImageName}`}
                      : require('../../Assets/dishes/download2.jpeg')
                  }
                />
                <View style={styles.textContainer}>
                  <Text style={[styles.name, themeStyles.name]}>
                    {item.foodName}
                  </Text>
                  <Text style={[styles.description, themeStyles.description]}>
                    {item.variant}
                  </Text>
                  <Text style={[styles.price, themeStyles.price]}>
                    ${item.price}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[styles.addToCartButton, themeStyles.addToCartButton]}
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

      {/* Modal */}
      {selectedItem && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={themeStyles.modalBackground}>
            <View style={themeStyles.modalContainer}>
              <Image
                source={
                  selectedItem.foodImageName
                    ? {uri: `${BASE_IMAGE_URL}${selectedItem.foodImageName}`}
                    : require('../../Assets/dishes/download2.jpeg')
                }
                style={styles.modalImage}
              />
              <Text style={[styles.modalFoodName, themeStyles.modalFoodName]}>
                {selectedItem.foodName}
              </Text>
              <Text style={styles.modalDescription}>
                {selectedItem.variant}
              </Text>
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
                style={[
                  styles.modalAddToCartButton,
                  themeStyles.modalAddToCartButton,
                ]}
                onPress={() => handleAddToCart(selectedItem)}>
                <Icon.ShoppingCart stroke="white" strokeWidth={2} />
                <Text style={styles.modalAddToCartText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeModalButton}>
                <Icon.X
                  stroke={darkMode ? '#fff' : 'black'}
                  width={25}
                  height={25}
                  style={styles.closeModalText}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    color: '#000',
  },
  subDishesContainer: {
    backgroundColor: '#fff',
  },
  title: {
    color: '#333',
  },
  subDishContainer: {
    backgroundColor: '#fff',
  },
  name: {
    color: '#333',
  },
  description: {
    color: '#777',
  },
  price: {
    color: '#f97316',
  },
  addToCartButton: {
    backgroundColor: '#f97316',
  },
  modalFoodName: {
    color: '#333',
  },
  modalAddToCartButton: {
    backgroundColor: '#f97316',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalAddToCartButton: {
    backgroundColor: '#f97316',
    padding: 12,
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalAddToCartText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    color: '#fff',
  },
  subDishesContainer: {
    backgroundColor: '#333',
  },
  title: {
    color: '#fff',
  },
  subDishContainer: {
    backgroundColor: '#444',
  },
  name: {
    color: '#fff',
  },
  description: {
    color: '#bbb',
  },
  price: {
    color: '#f97316',
  },
  addToCartButton: {
    backgroundColor: '#f97316',
  },
  modalFoodName: {
    color: '#fff',
  },
  modalAddToCartButton: {
    backgroundColor: '#f97316',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    backgroundColor: '#444',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalAddToCartText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#f97316',
    padding: 6,
    borderRadius: 50,
  },
  cartIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {},
  subDishesContainer: {
    flex: 1,
    padding: 16,
    marginTop: -40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subDishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
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
  },
  description: {
    fontSize: 14,
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    borderRadius: 50,
    padding: 8,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
  },
  noItemsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  noItemsText: {
    fontSize: 18,
    color: '#555',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    width: '80%',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  modalFoodName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  counterButton: {
    backgroundColor: '#f97316',
    borderRadius: 50,
    padding: 5,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 24,
    color: '#fff',
  },
  counter: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  modalAddToCartButton: {
    backgroundColor: '#f97316',
    padding: 12,
    width: '100%',
    marginTop: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  modalAddToCartText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  closeModalButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeModalText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SubDishes;
