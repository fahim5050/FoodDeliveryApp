import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const FeatureRow = ({title, restaurants, description}) => {
  const navigation = useNavigation();
  const darkMode = useSelector(state => state.theme.darkMode); // Get dark mode state from Redux

  // Conditional style based on darkMode
  const themeStyles = darkMode ? styles.dark : styles.light;

  return (
    <View>
      <View style={[styles.container, themeStyles.container]}>
        <View>
          <Text style={[styles.title, themeStyles.title]}>{title}</Text>
          <Text style={[styles.description, themeStyles.description]}>
            {description}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('AllRestaurant')}>
          <Text style={[styles.btn, themeStyles.btn]}>See All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        style={{overflow: 'visible', paddingVertical: 5}}>
        {restaurants.map((restaurant, index) => {
          return <RestaurantCard key={index} item={restaurant} />;
        })}
      </ScrollView>
    </View>
  );
};

export default FeatureRow;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    color: 'gray',
  },
  btn: {
    color: '#f97316',
    fontWeight: 'semibold',
  },
  // Light Mode Styles
  light: {
    container: {
      backgroundColor: '#fff',
    },
    title: {
      color: '#333',
    },
    description: {
      color: '#444',
    },
    btn: {
      color: '#f97316',
    },
  },
  // Dark Mode Styles
  dark: {
    container: {
      backgroundColor: 'transparent',
    },
    title: {
      color: '#fff',
    },
    description: {
      color: '#aaa',
    },
    btn: {
      color: '#ff6347', // You can adjust this color to match your dark mode design
    },
  },
});
