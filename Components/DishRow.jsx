import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';

const DishRow = ({item}) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('SubDishes', {
      subDishes: item.subDishes, // Pass the sub-dishes
      dishName: item.name,       // Pass the dish name
      dishImage: item.image,     // Pass the main dish image
    });
  }
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.image} source={item.image} />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.dishDescription}>{item.description}</Text>
        </View>
        {/* <View style={styles.priceQuantityContainer}> */}
        {/* <Text style={styles.priceText}>${item.price}</Text> */}
        {/* <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => handleDecrease}
              style={styles.iconButton}>
              <Icon.Minus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
            <Text style={styles.quantityText}>5</Text>
            <TouchableOpacity
              onPress={() => handleIncrease}
              style={styles.iconButton}>
              <Icon.Plus
                strokeWidth={2}
                height={20}
                width={20}
                stroke="white"
              />
            </TouchableOpacity>
          </View> */}
        {/* </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default DishRow;

const styles = StyleSheet.create({
  container: {
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
    elevation: 3,

  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
  detailsContainer: {
    flex: 1,
    display: 'flex',
    paddingLeft: 8,
   
  },
  textContainer: {
    paddingLeft: 3,
  },
  dishName: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
  },
  dishDescription: {
    color: 'gray',
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 3,
    alignItems: 'center',
  },
  priceText: {
    fontWeight: 'bold',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: '#f97316',
    marginHorizontal: 3,
  },
  quantityText: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: 'black',
  },
});
