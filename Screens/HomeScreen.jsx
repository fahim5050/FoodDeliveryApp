import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Icon from 'react-native-feather';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBranches} from '../Utils/Apis';
import {featured} from '../constants';
import FeatureRow from '../Components/FeatureRow';
import Header from '../Components/Header/Header';
import Categories from '../Components/Categories';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const branches = useSelector(state => state.data?.data);
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/FoodImages/';
  const darkMode = useSelector(state => state.theme.darkMode);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const fetchSearchResults = async query => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://bitebaseapiservices.paktech24.com/api/Food/GetBranchCategoryFood',
        {
          params: {query},
        },
      );
      const filteredResults = response.data.filter(item =>
        item.foodName?.toLowerCase().includes(query.toLowerCase()),
      );

      setSearchResults(filteredResults);

      if (filteredResults.length === 0) {
        setError('No results found');
      }
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleItemPress = item => {
    navigation.navigate('SingleProduct', {item});
    setSearchQuery('');
  };

  const themeStyles = darkMode ? darkTheme : lightTheme;

  return (
    <SafeAreaView style={[styles.container, themeStyles.container]}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={themeStyles.container.lightBackgroundColor}
      />

      <View style={styles.headerContainer}>
        <Header />
      </View>

      <View style={styles.mainContent}>
        <View style={styles.searchBar}>
          <View style={[styles.searchBarInputContainer, themeStyles.searchBarInputContainer]}>
            <Icon.Search stroke="gray" width={20} height={20} />
            <TextInput
              placeholder="Search for bite food"
              placeholderTextColor={darkMode ? 'gray' : '#888'}
              style={[styles.textInput, themeStyles.textInput]}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <View style={styles.locationContainer}>
              <Icon.MapPin stroke="gray" width={18} height={18} />
              <Text style={themeStyles.locationText}>Deans Peshawar</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.sliderIcon}>
            <Icon.Sliders
              stroke="white"
              width={20}
              height={20}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>

        {searchQuery && (
          <View
            style={[
              styles.suggestionsContainer,
              themeStyles.suggestionsContainer,
            ]}>
            {loading ? (
              <Text style={themeStyles.loadingText}>Loading...</Text>
            ) : error ? (
              <Text style={themeStyles.errorText}>{error}</Text>
            ) : (
              <ScrollView style={styles.suggestionsScroll}>
                {searchResults.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionItem}
                    onPress={() => handleItemPress(item)}>
                    <View style={styles.resultRow}>
                      <Image
                        source={
                          item.foodImageName
                            ? {uri: `${BASE_IMAGE_URL}${item.foodImageName}`}
                            : require('../Assets/images/profile.jpg')
                        }
                        style={styles.foodImage}
                      />
                      <View style={styles.textContainer}>
                        <Text style={themeStyles.foodName}>
                          {item.foodName}
                        </Text>
                        <Text style={themeStyles.priceText}>
                          Price: ${item.price}
                        </Text>
                        <Text style={themeStyles.restaurantName}>
                          {item.branchName}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        )}

        <Categories />

        <ScrollView contentContainerStyle={styles.scrollableContent}>
          <View style={styles.featureContainer}>
            {[featured].map((item, index) => (
              <FeatureRow
                key={index}
                title={item.title}
                restaurants={branches}
                description={item.description}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const lightTheme = StyleSheet.create({
  container: {backgroundColor: '#fff',lightBackgroundColor:'#f97316'},
  textInput: {color: '#000'},
  locationText: {color: '#666'},
  suggestionsContainer: {backgroundColor: '#fff'},
  loadingText: {color: '#000'},
  errorText: {color: 'red'},
  foodName: {color: '#333', fontWeight: 'bold'},
  priceText: {color: '#f97316'},
  restaurantName: {color: 'gray'},
});

const darkTheme = StyleSheet.create({
  container: {backgroundColor: '#000',lightBackgroundColor:'#333'},
  searchBarInputContainer:{backgroundColor: '#000',borderColor:'#fff',borderWidth:1},
  textInput: {color: '#fff'},
  locationText: {color: '#bbb'},
  suggestionsContainer: {backgroundColor: '#222'},
  loadingText: {color: '#fff'},
  errorText: {color: 'red'},
  foodName: {color: '#fff', fontWeight: 'bold'},
  priceText: {color: '#f97316'},
  restaurantName: {color: '#bbb'},
});

const styles = StyleSheet.create({
  container: {flex: 1},
  headerContainer: {paddingHorizontal: 0}, // Remove padding from left and right
  mainContent: {padding: 15},
  searchBar: {flexDirection: 'row', alignItems: 'center', marginBottom: 15},
  searchBarInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 25,
  },
  textInput: {flex: 1, marginHorizontal: 10},
  locationContainer: {flexDirection: 'row', alignItems: 'center'},
  sliderIcon: {backgroundColor: '#f97316', padding: 10, borderRadius: 25, marginLeft:5},
  suggestionsContainer: {
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    top: 80,
    left: 15,
    right: 15,
    zIndex: 10,
  },
  suggestionsScroll: {maxHeight: 300},
  suggestionItem: {paddingVertical: 10},
  resultRow: {flexDirection: 'row', alignItems: 'center'},
  foodImage: {width: 50, height: 50, borderRadius: 10},
  textContainer: {marginLeft: 10},
  scrollableContent: {paddingBottom: 20},
  featureContainer: {marginTop: 10},
});


export default HomeScreen;
