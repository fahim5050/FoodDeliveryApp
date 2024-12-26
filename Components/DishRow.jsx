import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductVariantsByCategoryId } from '../Utils/Apis';

const DishRow = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const darkMode = useSelector((state) => state.theme.darkMode); // Access theme state
  const themeStyles = darkMode ? darkTheme : lightTheme; // Determine styles based on theme

  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/FoodImages/';

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
      <View style={[styles.fallbackContainer, themeStyles.fallbackContainer]}>
        <Text style={[styles.fallbackText, themeStyles.fallbackText]}>
          Unavailable.
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, themeStyles.container]}
      onPress={handlePress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="large" color="#f97316" style={styles.loader} />
      ) : (
        <>
          <Image
            style={styles.image}
            source={
              item.imageName
                ? { uri: `${BASE_IMAGE_URL}${item.imageName}` }
                : require('../Assets/images/profile.jpg')
            }
          />
          <View style={styles.detailsContainer}>
            <View style={styles.textContainer}>
              <Text style={[styles.dishName, themeStyles.dishName]}>
                {item.name}
              </Text>
              {/* <Text style={[styles.dishDescription, themeStyles.dishDescription]}>
                {item.createdDate}
              </Text> */}
            </View>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default DishRow;

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  dishName: {
    color: '#000',
  },
  dishDescription: {
    color: 'gray',
  },
  fallbackContainer: {
    backgroundColor: '#f8f8f8',
  },
  fallbackText: {
    color: '#000',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  dishName: {
    color: '#fff',
  },
  dishDescription: {
    color: '#ccc',
  },
  fallbackContainer: {
    backgroundColor: '#444',
  },
  fallbackText: {
    color: '#fff',
  },
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#990',
    marginHorizontal: 2,
    marginBottom: 3,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
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
    fontWeight: 'bold',
  },
  dishDescription: {
    fontSize: 12,
  },
  fallbackContainer: {
    padding: 10,
    borderRadius: 10,
  },
  fallbackText: {
    textAlign: 'center',
    fontSize: 14,
  },
});
