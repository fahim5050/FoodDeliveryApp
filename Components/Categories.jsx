import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { categories, featured } from '../constants';
import * as Icon from 'react-native-feather';

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    // setModalVisible(true);
  };

  // Filter restaurants based on selected category
  const selectedCategoryData = featured.restaurants.filter((restaurant) => 
    restaurant.category === categories.find((cat) => cat.id === activeCategory)?.name
  );
  // console.log("Restaurants Data:", featured.restaurants);
  // console.log("Categories Data:", categories);
  // console.log("Active Category ID:", activeCategory);
  // console.log("Selected Category Data:", selectedCategoryData);
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.ScrollView}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 13 }}
      >
        {categories.map((category, index) => {
          let isActive = category.id === activeCategory;
          let btnColor = isActive ? '#9c9a97' : '#dbdad7';
          let textColor = isActive ? '#f97316' : 'gray';
          let fontWeight = isActive ? 'bold' : 'normal';

          return (
            <View key={index} style={styles.mainContainer}>
              <TouchableOpacity
                style={[styles.items, { backgroundColor: btnColor }]}
                onPress={() => handleCategorySelect(category.id)}
              >
                <Image style={{ width: 45, height: 45 }} source={category.image} />
              </TouchableOpacity>
              <Text style={{ color: textColor, fontWeight }}>{category.name}</Text>
            </View>
          );
        })}
      </ScrollView>

      {/* Modal with category heading and FlatList for food items */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {/* Close icon (X) in the top-right corner */}
          <Icon.X
            height="20"
            width="20"
            stroke="white"
            strokeWidth={2}
            style={styles.closeIcon}
            onPress={() => setModalVisible(false)}
          />

          {/* Display Category Name as Heading */}
          <Text style={styles.modalHeading}>
            {categories.find((cat) => cat.id === activeCategory)?.name}
          </Text>

          {/* Display category items */}
          <FlatList
            data={selectedCategoryData.length > 0 ? selectedCategoryData[0].dishes : []}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.foodItem}>
                <Image source={item.image} style={{ width: 80, height: 80 }} />
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodDescription}>{item.description}</Text>
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  ScrollView: {
    overflow: 'visible',
  },
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  items: {
    padding: 10,
    borderRadius: 100,
    shadowColor: 'gray',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fcd4b8',
    padding: 20,
    marginTop: 150, // Adjusts the height of the modal from the top
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 5 }, // Offset for shadow positioning
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 50, // Shadow blur radius for iOS
    elevation: 10, // Elevation for Android shadow
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#f97316',
    padding: 6,
    borderRadius: 20,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#f97316',
  },
  foodItem: {
    padding: 10,
    alignItems: 'center',
  },
  foodName: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
  },
  foodDescription: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginTop: 3,
  },
});