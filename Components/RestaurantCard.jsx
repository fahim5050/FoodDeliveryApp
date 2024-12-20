import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux'; // Access the theme state

const RestaurantCard = ({ item }) => {
  const navigation = useNavigation();
  
  // Access the theme state for dark mode
  const darkMode = useSelector((state) => state.theme.darkMode);
  const themeStyles = darkMode ? darkTheme : lightTheme; // Apply theme styles based on dark mode

  // Example variable height for image based on item properties
  const imageHeight = item.large ? 160 : 120; // Adjust size based on your condition
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/Logos/';

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Restaurant', { ...item })}>
      <View style={[styles.container, themeStyles.container]}>
        <View style={[styles.imageContainer, { height: imageHeight }]}>
          <Image
            style={styles.image}
            source={
              item.branchLogoName
                ? { uri: `${BASE_IMAGE_URL}${item.branchLogoName}` }
                : require('../Assets/restaurants/download.jpeg')
            }
          />
        </View>
        <View style={[styles.detailContainer, themeStyles.detailContainer]}>
          <Text style={[styles.restaurantName, themeStyles.restaurantName]}>
            {item.branchName}
          </Text>
          <View style={styles.ratingContainer}>
            <Icon.Star fill="gold" stroke="gold" height="15" width="15" />
            <Text style={styles.ratingText}>{item.star}</Text>
            <Text style={styles.review}>
              ({item.review} reviews ) -{' '}
              <Text style={{ fontWeight: 'medium', color: 'black' }}>
                {item.category}
              </Text>
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 1, marginTop: 5 }}>
            <Icon.MapPin color="gray" width="15" height="15" />
            <Text style={[themeStyles.addressText, { fontSize: 12 }]}>
              Nearby. {item.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RestaurantCard;

// Light and Dark theme styles
const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  detailContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
  },
  addressText: {
    color: 'gray',
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#333',
  },
  detailContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  addressText: {
    color: 'lightgray',
  },
});

const styles = StyleSheet.create({
  container: {
    marginRight: 6,
    borderRadius: 10,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 230,
    width: 260,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  detailContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
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
});
