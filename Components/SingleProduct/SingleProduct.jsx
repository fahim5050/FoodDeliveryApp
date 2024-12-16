import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'react-native-feather'; // Direct import
import { useDispatch } from 'react-redux'; // Import useDispatch
import { addToCart } from '../../redux/CartSlice';


const SingleProduct = ({ route, navigation }) => {
  const { item = {} } = route.params || {}; // Safeguard against undefined params
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch(); // Initialize the dispatch function

  const handleAddToCart = () => {
    const product = {
      foodId: item.foodId || item.id, // Ensure there's a unique identifier
      foodName: item.foodName,
      price: item.price,
      quantity,
      foodImageName: item.foodImageName,
    };
    dispatch(addToCart(product)); // Dispatch the addToCart action
    alert(`${item.foodName} added to cart!`);
    navigation.navigate('Home');
    
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <ArrowLeft strokeWidth={3} stroke="#fff" />
      </TouchableOpacity>

      {/* Product Image */}
      <Image
        source={
          item.foodImageName
            ? { uri: `https://pos7.paktech24.com/images/FoodImages/${item.foodImageName}` }
            : require('../../Assets/images/profile.jpg')
        }
        style={styles.image}
      />

      {/* Product Details */}
      <Text style={styles.title}>{item.foodName || 'No food name'}</Text>
      <Text style={styles.price}>Price: ${item.price || '0.00'}</Text>
      <Text style={styles.description}>{item.branchName || 'No branch specified'}</Text>

      {/* Counter */}
      <View style={styles.counterContainer}>
        <TouchableOpacity
          onPress={() => setQuantity(Math.max(1, quantity - 1))}
          style={styles.counterButton}
        >
          <Text style={styles.counterText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          onPress={() => setQuantity(quantity + 1)}
          style={styles.counterButton}
        >
          <Text style={styles.counterText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#f97316',
    borderRadius: 20,
    padding: 8,
    zIndex: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: '#f97316',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    backgroundColor: '#f97316',
    padding: 10,
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 20,
  },
  addToCartButton: {
    backgroundColor: '#f97316',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SingleProduct;
