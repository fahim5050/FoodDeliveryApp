import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { featured } from '../constants';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const AllRestaurant = () => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('Restaurant', { ...item });
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon.ArrowLeft strokeWidth={3} stroke="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Select a Restaurant</Text>
      </View>

      {/* Restaurant List */}
      <FlatList
        data={featured.restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)} style={styles.itemContainer}>
            {/* Image on the left */}
            <Image source={item.image} style={styles.image} />

            {/* Details on the right */}
            <View style={styles.detailsContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.ratingContainer}>
                <Icon.Star fill="gold" stroke="gold" height={15} width={15} />
                <Text style={styles.ratingText}>{item.star}</Text>
                <Text style={styles.reviewText}>
                  ({item.review} reviews) - <Text style={{ fontWeight: '500' }}>{item.category}</Text>
                </Text>
              </View>
              <View style={styles.locationContainer}>
                <Icon.MapPin color="gray" width={15} height={15} />
                <Text style={styles.addressText}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default AllRestaurant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#f97316',
    padding: 6,
    borderRadius: 50,
    marginRight: 15,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 1,
  },
  listContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    width: '90%',
    padding: 10,
    marginVertical: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    color: 'green',
  },
  reviewText: {
    marginLeft: 4,
    fontSize: 14,
    color: 'gray',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  addressText: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 4,
  },
});
