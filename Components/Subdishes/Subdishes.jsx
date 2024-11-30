import { useNavigation } from '@react-navigation/native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SubDishes = ({route}) => {
  const navigation = useNavigation();
  const {subDishes, dishName, dishImage} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{uri: dishImage}} style={styles.mainDishImage} />
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View style={styles.subDishContainer}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{item.foodName}</Text>
                  <Text style={styles.description}>{item.variant}</Text>
                  <Text style={styles.price}>${item.price}</Text>
                </View>
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
    </View>
  );
};
const styles = StyleSheet.create({
  // Container for the entire screen
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },

  // Main dish image at the top
  mainDishImage: {
    width: '100%',
    height: 200, // Adjust the height as necessary for better appearance
  },

  // Back button style
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 50,
  },

  // Sub-dishes container to hold the list
  subDishesContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    marginTop: -40, // Adjusted position of sub-dishes container to overlap the image
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5, // Adds shadow effect for Android
    // zIndex: 1, // Ensures it's under the back button
  },

  // Title at the top of the sub-dishes section
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },

  // Each sub-dish container
  subDishContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#990',
    marginHorizontal: 2,
    marginBottom: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 6,
  },

  // Sub-dish image styling
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 16,
  },

  // Text container within each sub-dish
  textContainer: {
    flex: 1,
  },

  // Sub-dish name text styling
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // Sub-dish description text styling
  description: {
    fontSize: 14,
    color: '#777',
    marginVertical: 4,
  },

  // Sub-dish price text styling
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f97316', // Orange color for price to match the theme
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
});

export default SubDishes;
