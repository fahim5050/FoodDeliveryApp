import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchProductVariantsByCategoryId} from '../Utils/Apis';

const DishRow = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handlePress = () => {
    if (item.id) {
      dispatch(fetchProductVariantsByCategoryId(item.id))
        .unwrap() // Ensure you get the resolved payload
        .then((productVariants) => {
          navigation.navigate('SubDishes', {
            subDishes: productVariants, // Pass the fetched product variants
            dishName: item.name, // Pass the dish name
            dishImage: item.imageName, // Pass the main dish image
          });
        })
        .catch((error) => {
          console.error('Error fetching product variants:', error);
        });
    }
  };

  if (!item || !item.name || !item.imageName) {
    return <Text>Unavailable</Text>; // If item data is incomplete or not provided
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.image} source={item.imageName} />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.dishName}>{item.name}</Text>
          <Text style={styles.dishDescription}>{item.createdDate}</Text>
        </View>
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
