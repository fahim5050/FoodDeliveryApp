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
import React, {useEffect, useState} from 'react';
import * as Icon from 'react-native-feather';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {fetchBranches} from '../Utils/Apis';
import {featured} from '../constants';
import FeatureRow from '../Components/FeatureRow';
import Header from '../Components/Header/Header';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const branches = useSelector(state => state.data?.data);
  const BASE_IMAGE_URL = 'https://pos7.paktech24.com/images/FoodImages/';
  // State for search query and search results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch branches initially
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  // Function to fetch search results from the API
  const fetchSearchResults = async query => {
    if (!query) {
      setSearchResults([]); // Clear results if query is empty
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        'https://bitebaseapiservices.paktech24.com/api/Food/GetBranchCategoryFood',
        {
          params: {query}, // Replace with the actual parameter name if needed
        },
      );

      setSearchResults(response.data || []); // Update results with API response
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Trigger search API on search query change
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults(searchQuery);
    }, 500); // Debounce to prevent frequent API calls

    return () => clearTimeout(delayDebounceFn); // Cleanup
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {/* Header */}
      <View style={styles.headerContainer}>
        <Header />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <View style={styles.searchBarIcon}>
            <Icon.Search stroke="gray" width="25" height="25" />
            <TextInput
              placeholder="Search for bite food"
              style={styles.textInput}
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
            <View style={styles.location}>
              <Icon.MapPin stroke="gray" height="20" width="20" />
              <Text>Deans Peshawar</Text>
            </View>
          </View>
          <View style={styles.sliderIcon}>
            <Icon.Sliders
              stroke="white"
              height="25"
              width="25"
              strokeWidth={2.5}
            />
          </View>
        </View>

        {/* Suggestions */}
        {searchQuery && (
          <View style={styles.suggestionsContainer}>
            {loading ? (
              <Text>Loading...</Text>
            ) : error ? (
              <Text style={{color: 'red'}}>{error}</Text>
            ) : searchResults.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.suggestionsScroll}>
                {searchResults.map((item, index) => (
                  <TouchableOpacity key={index} style={styles.suggestionItem}>
                    <View style={styles.resultRow}>
                      {/* Left-side Image */}
                      <View style={styles.imageContainer}>
                        <Image
                          source={
                            item.foodImageName
                              ? {uri: `${BASE_IMAGE_URL}${item.foodImageName}`} // Use the URL if it exists
                              : require('../Assets/images/profile.jpg') // Fallback to local image
                          }
                          style={styles.foodImage}
                        />
                      </View>
                      {/* Right-side Text */}
                      <View style={styles.textContainer}>
                        <Text style={styles.foodName}>
                          {item.foodName || 'No food name'}
                        </Text>
                        <Text style={{color:'#f97316'}}>Price: ${item.price}</Text>
                        <Text style={styles.restaurantName}>
                          {item.branchName || 'No restaurant name'}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            ) : (
              <Text>No results found</Text>
            )}
          </View>
        )}

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 20}}>
          {/* Featured Section */}
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    padding: 0,
  },
  mainContent: {
    padding: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingBottom: 3,
    gap: 5,
  },
  searchBarIcon: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'gray',
  },
  textInput: {
    flex: 1,
    marginLeft: 2,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: 'gray',
    paddingLeft: 2,
  },
  sliderIcon: {
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#f97316',
  },
  featureContainer: {
    marginTop: 5,
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 80,
    left: 15,
    right: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    // maxHeight:"500",
    padding: 10,
    zIndex: 10,
  },
  suggestionItem: {
    paddingVertical: 5,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Placeholder background
  },
  textContainer: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  restaurantName: {
    fontSize: 14,
    color: 'gray',
    marginTop: 2,
  },
  suggestionsScroll: {
    maxHeight: 700, // Limit the height to make it scrollable
  },
});
