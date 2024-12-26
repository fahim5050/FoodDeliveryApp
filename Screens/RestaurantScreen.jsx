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
import {useNavigation, useRoute } from '@react-navigation/native';
import * as Icon from 'react-native-feather';
import DishRow from '../Components/DishRow';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFoodCategoriesByBranchId } from '../Utils/Apis';
import { useFocusEffect } from '@react-navigation/native'; // <-- Import useFocusEffect
import CartIcon from '../Components/cartIcon/cartIcon';


const RestaurantScreen = () => {
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/Logos/';
  const { params } = useRoute();
  const { branchName, address, branchLogoName, id, description, star, review, category } = params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode); // Get dark mode state from Redux

  const { productVariants = [], status } = useSelector((state) => state.data); // Default to empty array if undefined

  useFocusEffect(
    useCallback(() => {
      if (id) {
        dispatch(fetchFoodCategoriesByBranchId(id)); // Fetch categories for the restaurant's branch
      }
    }, [id, dispatch])
  );

  if (status === 'loading') {
    return (
      <View style={[styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  const themeStyles = darkMode ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      {/* <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} hidden={true} /> */}
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={
              branchLogoName
                ? { uri: `${BASE_IMAGE_URL}${branchLogoName}` }
                : require('../Assets/restaurants/download.jpeg')
            }
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon.ArrowLeft strokeWidth={3} stroke="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cartIconContainer}
          >
            <CartIcon onPress={() => navigation.navigate('Cart')} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>

        <View style={[styles.detailsContainer, themeStyles.detailsContainer]}>
          <View style={styles.headerContainer}>
            <Text style={[styles.restaurantName, themeStyles.text]}>{branchName}</Text>
            <View style={styles.ratingRow}>
              <View style={styles.ratingContainer}>
                <Icon.Star fill="gold" stroke="gold" height={15} width={15} />
                <Text style={[styles.ratingText, themeStyles.text]}>{star}</Text>
                <Text style={styles.review}>
                  ({review} reviews) -{' '}
                  <Text style={[styles.category, themeStyles.text]}>{category}</Text>
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text style={[styles.locationText, themeStyles.text]}>Nearby. {address}</Text>
              </View>
            </View>
            <Text style={[styles.description, themeStyles.description]}>{description}</Text>
          </View>
        </View>

        <View style={[styles.menuContainer, themeStyles.container]}>
          <Text style={[styles.menuTitle, themeStyles.text]}>Menu</Text>
          {productVariants.length > 0 ? (
            productVariants.map((dish, index) => (
              <DishRow key={dish.id || `unique-${index}`} item={dish} />
            ))
          ) : (
            <Text style={[styles.noDishesText, themeStyles.text]}>
              Sorry No dishes available for this restaurant.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default RestaurantScreen;

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  detailsContainer: {
    backgroundColor: '#f9f9f9',
  },
  text: {
    color: '#000',
  },
  description: {
    color: '#555',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
  },
  detailsContainer: {
    backgroundColor: '#1e1e1e',
  },
  text: {
    color: '#fff',
  },
  description: {
    color: '#aaa',
  },
 
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
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
  },
  detailsContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -35,
    paddingTop: 16,
  },
  headerContainer: {
    paddingHorizontal: 20,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '500',
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
  },
  review: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  category: {
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  locationText: {
    fontSize: 12,
    marginLeft: 4,
  },
  description: {
    marginTop: 8,
    fontSize: 14,
  },
  menuContainer: {
    paddingHorizontal: 16,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  noDishesText: {
    textAlign: 'center',
    marginTop: 10,
  },
});
