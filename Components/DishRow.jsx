import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {fetchProductVariantsByCategoryId} from '../Utils/Apis';

const DishRow = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = () => {
    if (item?.id) {
      setIsLoading(true); // Show loading indicator
      dispatch(fetchProductVariantsByCategoryId(item.id))
        .unwrap()
        .then((productVariants) => {
          setIsLoading(false); // Hide loading indicator
          navigation.navigate('SubDishes', {
            subDishes: productVariants,
            dishName: item.name,
            dishImage: item.imageName,
          });
        })
        .catch((error) => {
          setIsLoading(false); // Hide loading indicator
          console.error('Error fetching product variants:', error);
          alert('Unable to fetch product details. Please try again.');
        });
    } else {
      alert('Invalid item selected.');
    }
  };

  // Fallback for missing or undefined data
  if (!item || !item.name || !item.imageName) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}> unavailable.</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#f97316" style={styles.loader} />
      ) : (
        <>
          <Image style={styles.image} source={{uri: item.imageName}} />
          <View style={styles.detailsContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.dishName}>{item.name}</Text>
              <Text style={styles.dishDescription}>{item.createdDate}</Text>
            </View>
          </View>
        </>
      )}
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
