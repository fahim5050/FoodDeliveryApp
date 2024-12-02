import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import DishRow from '../Components/DishRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodCategoriesByBranchId } from '../Utils/Apis';
import { useFocusEffect } from '@react-navigation/native'; // <-- Import useFocusEffect

const RestaurantScreen = () => {
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/restaurant/';
  const { params } = useRoute();
  const { branchName, address, imageName, id, description, star, review, category } = params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { productVariants = [], status } = useSelector((state) => state.data); // Default to empty array if undefined

  // Fetch categories when the screen is focused
  useFocusEffect(
    useCallback(() => {
      if (id) {
        dispatch(fetchFoodCategoriesByBranchId(id)); // Fetch categories for the restaurant's branch
      }
    }, [id, dispatch]) // <-- Dependencies ensure fetch is tied to id and dispatch
  );

  // Show loading spinner if the data is still loading
  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} hidden={true} />
      <ScrollView>
        {/* Restaurant Banner */}
        <View style={styles.imageContainer}>
        <Image
  style={styles.image}
  source={
    imageName
      ? { uri: `${BASE_IMAGE_URL}${imageName}` } // Use the URL if it exists
      : require('../Assets/restaurants/download.jpeg') // Fallback to local image
  }
/>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon.ArrowLeft strokeWidth={3} stroke="#f97316" />
          </TouchableOpacity>
        </View>

        {/* Restaurant Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.restaurantName}>{branchName}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <Icon.Star fill="gold" stroke="gold" height={15} width={15} />
                <Text style={styles.ratingText}>{star}</Text>
                <Text style={styles.review}>
                  ({review} reviews) -{' '}
                  <Text style={styles.category}>{category}</Text>
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text style={styles.locationText}>Nearby. {address}</Text>
              </View>
            </View>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Menu</Text>
          {productVariants.length > 0 ? (
            productVariants.map((dish) => (
              <DishRow key={dish.id} item={{ ...dish }} />
            ))
          ) : (
            <Text style={styles.noDishesText}>Sorry No dishes available for this restaurant.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Optional background color for the loading screen
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
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
  detailsContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: 'white',
    marginTop: -35,
    paddingTop: 16,
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: 'green',
  },
  review: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  category: {
    fontWeight: '500',
    color: 'black',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 4,
  },
  description: {
    marginTop: 8,
    color: 'gray',
    fontSize: 14,
  },
  menuContainer: {
    backgroundColor: 'white',
  },
  menuTitle: {
    padding: 16,
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
  },
  noDishesText: {
    padding: 16,
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});
