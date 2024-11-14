import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import {useNavigation} from '@react-navigation/native';

const RestaurantCard = ({item}) => {
  const navigation = useNavigation();
  // Example variable height for image based on item properties
  const imageHeight = item.large ? 160 : 120; // Adjust size based on your condition

  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate('Restaurant', {...item})}>
      <View style={styles.container}>
        <View style={[styles.imageContainer, {height: imageHeight}]}>
          <Image style={styles.image} source={item.image} />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Icon.Star fill="gold" stroke="gold" height="15" width="15" />
            <Text style={styles.ratingText}>{item.star}</Text>
            <Text style={styles.review}>
              ({item.review} reviews ) -
              <Text style={{fontWeight: 'medium', color: 'black'}}>
                {item.category}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              marginTop: 5,
            }}>
            <Icon.MapPin color="gray" width="15" height="15" />
            <Text style={{color: 'gray', fontSize: 12}}>
              Nearby. {item.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RestaurantCard;

const styles = StyleSheet.create({
  container: {
    marginRight: 6,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#f97316',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    height: 230,
    width: 260, // Adjust width as needed
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
    resizeMode: 'cover', // Ensures the image covers the area without stretching
  },
  detailContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    // alignItems: 'center',
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
    // textAlign: 'center',
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
